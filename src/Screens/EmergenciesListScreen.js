import React from 'react';
import { ActivityIndicator, AsyncStorage, Image, Linking, Platform, RefreshControl, ListView, View, Text, TextInput } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers,
} from 'react-navigation';

import styles from './../styles/main.style';
const URL = 'http://bomberos.devstec.com';
// Emergency.
import Emergency from './../components/Emergency';

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

class EmergenciesListScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isRefreshing: false,
      isLoading: true,
      text: '',
      data: [],
      rowData: dataSource,
    }
  }

  _onClick = (row) => {
    //let url = 'waze://app';
    let url = `waze://?ll=${row.map.longitude},${row.map.latitude}&navigate=yes`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // @TODO: Remove and use a Log technique.
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  _onChangeSearchText = (text) => {
    const rowData = dataSource.cloneWithRows(
      this.state.data.filter(item => item.fire_stations.includes(text))
    );
    this.setState({ rowData });
  };

  componentDidMount() {
    this.fetchData().done();
    SplashScreen.hide();
  }
  /**
   * Get firefighters data in json format.
   */
  async fetchData(refreshData = false) {
    const savedData = await AsyncStorage.getItem('rowData');

    if (savedData === null || refreshData) {
      await AsyncStorage.removeItem('rowData');
      const response = await fetch(URL);
      const json = await response.json();

      this.setState({ rowData: this.state.rowData.cloneWithRows(json), data: json, isLoading: false });
      await AsyncStorage.setItem('rowData', JSON.stringify(json));
    } else {
      this.setState({ rowData: this.state.rowData.cloneWithRows(JSON.parse(savedData)), data: JSON.parse(savedData), isLoading: false });
    }
  }

  _renderRow = (row, i) => (
    <Emergency key={i} data={row} onClick={this._onClick} />
  )

  render() {
    const { isLoading, rowData } = this.state;
    const { navigate } = this.props.navigation;

    if (isLoading) {
      return (
        <View style={styles.container}><ActivityIndicator size={'large'} color={Platform.OS === 'ios' ? "#ff0000" : null}/></View>
      )
    }
    
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchForm}
          placeholder="Buscar por bomba"
          onChangeText={this._onChangeSearchText}
          underlineColorAndroid='transparent'
          placeholderTextColor="#CECECE"
        /> 
        {
          rowData.getRowCount() === 0 ? 
          <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
            <Text>No se encontraron emergencias.</Text>
          </View> :
          <ListView
            style={styles.scrollview}
            dataSource={rowData}
            renderRow={row => this._renderRow(row)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                tintColor="#ff0000"
                title="Cargando..."
                titleColor="#333"
              />
            }
          />
        }
      </View>
    );
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.fetchData(true).done();
    this.setState({ isRefreshing: false });
  };
}

export default EmergenciesListScreen;