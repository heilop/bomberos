/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 const URL = 'http://bomberos.devstec.com';
 const React = require('react');
 const ReactNative = require('react-native');
 const {
   ScrollView,
   StyleSheet,
   RefreshControl,
   Text,
   TextInput,
   TouchableHighlight,
   TouchableWithoutFeedback,
   View,
   Image,
   Linking
 } = ReactNative;

import { AppRegistry } from 'react-native';
 // Emergency.
import Emergency from './src/components/Emergency';
// Adds SpalshScreen thanks to crazycodeboy/react-native-splash-screen
import SplashScreen from 'react-native-splash-screen'


export default class bomberos extends React.Component {
  static title = '<RefreshControl>';
  static description = 'Adds pull-to-refresh support to a scrollview.';

  state = {
    isRefreshing: false,
    loaded: 0,
    text: '',
    rowData: Array.from(new Array(1)).map(
      (val, i) => (
        {
          address: 'AV. CERRO CAMACHO 880 SANTIAGO DE SURCO',
          emergency_type: 'EMERGENCIA MEDICA',
          status: 'ATENDIENDO',
          created: '03/06/2017 09:53:42 a.m.',
          number: "2017-028208",
          machines: ["AMB124-2", "AMB-96"],
          fire_stations: [],
          map: {
            "latitude": -76.9623405856671,
            "longitude": -12.0858319188482
          }
        }
      )),
  };

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
    this.setState({text});
  };

  _openEmergencyListScreen = () => {
    console.log('Opening emergency list screen');
  };
  _openRadioScreen = () => {
    console.log('Opening radio screen');
  };
  _openThanksScreen = () => {
    console.log('Opening thanks screen');
  };

  componentDidMount() {
    this.fetchData().done();
    SplashScreen.hide();
  }
  /**
   * Get firefighters data in json format.
   */
  async fetchData() {
    const response = await fetch(URL)
    const json = await response.json()

    this.setState({rowData: json})
  }

  render() {
    const rows = this.state.rowData.map((row, ii) => {
      // @TODO: Change machines to station.
      if (row.fire_stations.includes(this.state.text)) {
        return <Emergency key={ii} data={row} onClick={this._onClick}/>;
      }
      else if(this.state.text == '') {
        return <Emergency key={ii} data={row} onClick={this._onClick}/>;
      }
    });
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Cargando..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        <Text style={styles.titleMain}>
          Bomberos Perú
        </Text>
        <View style={styles.inlineNav}>
          <View style={styles.leftNav}>
            <TouchableHighlight onPress={this._openEmergencyList}>
              <Image  source={require("./src/images/icons/flame_1.png")}/>
            </TouchableHighlight>
          </View>
          <View style={styles.centerNav}>
            <TouchableHighlight onPress={this._openRadioScreen}>
              <Image source={require("./src/images/icons/radio_white_1.png")}/>
            </TouchableHighlight>
          </View>
          <View style={styles.rightNav}>
            <TouchableHighlight onPress={this._openThanksScreen}>
              <Image  source={require("./src/images/icons/helmet_white_1.png")}/>
            </TouchableHighlight>
          </View>
        </View>
        <TextInput
          style={styles.searchForm}
          placeholder="Buscar por bomba"
          onChangeText={this._onChangeSearchText}
          underlineColorAndroid='transparent'
          placeholderTextColor="#CECECE"
        />
        {rows}
      </ScrollView>

    );
  }

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    this.fetchData().done();
    this.setState({isRefreshing: false});
  };
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  
  searchForm: {
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CECECE',
    textAlign: 'center',
    color: '#CECECE',
    margin: 5
  },

  titleMain: {
    color: '#4A4A4A',
    fontSize: 28,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },

  inlineNav: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 5
  }
});

AppRegistry.registerComponent('bomberos', () => bomberos);
