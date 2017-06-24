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
   TouchableWithoutFeedback,
   View,
   Image,
   Linking
 } = ReactNative;

 import { AppRegistry } from 'react-native';

 // Emergency.
import Emergency from './src/components/Emergency';

export default class bomberos extends React.Component {
  static title = '<RefreshControl>';
  static description = 'Adds pull-to-refresh support to a scrollview.';

  state = {
    isRefreshing: false,
    loaded: 0,
    rowData: Array.from(new Array(1)).map(
      (val, i) => (
        {
          address: 'AV. CERRO CAMACHO 880 SANTIAGO DE SURCO',
          emergency_type: 'EMERGENCIA MEDICA',
          status: 'ATENDIENDO',
          created: '03/06/2017 09:53:42 a.m.',
          number: "2017-028208",
          machines: ["AMB124-2", "AMB-96"],
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

  componentDidMount() {
    this.fetchData().done();
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
      return <Emergency key={ii} data={row} onClick={this._onClick}/>;
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
});

AppRegistry.registerComponent('bomberos', () => bomberos);
