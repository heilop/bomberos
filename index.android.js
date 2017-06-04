/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 const URL = 'http://bomberos.devstec.com/data.json';
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

 class Row extends React.Component {
   _onClick = () => {
     this.props.onClick(this.props.data);
   };

   render() {
     const machines = this.props.data.machines.toString();
     /* @TODO: Replace <Image Source=... with this.props.data.emergency_type*/
     return (
      <TouchableWithoutFeedback onPress={this._onClick} >
         <View style={styles.row}>
           <Image source={require('./images/emergencia-medica.png')} style={{width: 50, height: 50}}/>
           <Text style={styles.emergency_type}>
             {this.props.data.emergency_type}
           </Text>
           <Text style={styles.address}>
             {this.props.data.address}
           </Text>
           <Text style={styles.status}>
             {this.props.data.status}
           </Text>
           <Text style={styles.created}>
             {this.props.data.created}
           </Text>
           <Text style={styles.machines}>
             {machines}
           </Text>

         </View>
       </TouchableWithoutFeedback>
     );
   }
 }

export default class bomberos extends React.Component {
  static title = '<RefreshControl>';
  static description = 'Adds pull-to-refresh support to a scrollview.';

  state = {
    isRefreshing: false,
    loaded: 0,
    stars: '?',
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
    row.clicks++;
    console.log(row);
    //let url = 'waze://app';
    let url = `waze://?ll=${row.map.longitude},${row.map.latitude}&navigate=yes`;
    console.log(url);
    Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log('Don\'t know how to open URI: ' + url);
          }
    });
  };

  componentDidMount() {
    this.fetchData().done()
  }
  /**
   * Get firefighters data in json format.
   */
  async fetchData() {
    const response = await fetch(URL)
    const json = await response.json()
    console.log(json);

    this.setState({rowData: json})
  }

  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick}/>;
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
    setTimeout(() => {
      // prepend 2 items
      const rowData = Array.from(new Array(2))
      .map((val, i) => ({
        text: 'Filas cargadas ' + (+this.state.loaded + i),
        clicks: 0,
      }))
      .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  };
}

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    padding: 20,
    margin: 5,
  },
  scrollview: {
    flex: 1,
  },
  address: {
    alignSelf: 'center',
    color: 'red',
  },
  emergency_type: {
    color: 'red',
  },
  status: {
    color: 'red',
  },
  created: {
    color: 'red',
  },
  machines: {
    color: 'red',
  },
});

AppRegistry.registerComponent('bomberos', () => bomberos);
