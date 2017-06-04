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

 var style = StyleSheet.create({
      content:{
          flex:1,
          flexDirection: 'row'
      },

      padding_left: {
          paddingLeft:15,
      },

      emergency_type: {
        color:'red',
        fontWeight: '700',
        textAlign:'center',
        fontSize: 24
      },

      padding_top: {
          paddingTop: 20
      },

      address: {
        color:'black'
      },

      created: {
        color:'black'
      },

      status: {
        color:'black',
        fontWeight: '700',
        textAlign:'center',
        fontSize: 18,
        paddingBottom: 5
      },

      machines: {
        color:'black',
      },

      text_center: {
        textAlign:'center',
        paddingLeft: 20
      }
  });
 class Row extends React.Component {
   _onClick = () => {
     this.props.onClick(this.props.data);
   };

   render() {
     const machines = this.props.data.machines.toString();
     const emergency_type = this.props.data.emergency_type.replace(/\s+/g, '-').toLowerCase();
     console.log(emergency_type);
     const IMAGES = {
       'accidente-vehicular': require('./images/accidente-vehicular.png'),
       'emergencia-medica': require('./images/emergencia-medica.png'),
       'incendio': require('./images/incendio.png'),
       'materiales-peligrosos': require('./images/materiales-peligrosos.png'),
       'rescate': require('./images/rescate.png'),
       'servicios-especial': require('./images/servicio-especial.png'),
     };
     /* @TODO: Replace <Image Source=... with this.props.data.emergency_type*/
     return (
      <TouchableWithoutFeedback onPress={this._onClick}>
         <View style={styles.row}>
          <View style={style.content}>
           <View style={style.padding_top}>
            <Image source={IMAGES[emergency_type]} style={{width: 50, height: 50}}/>
           </View>
           <View style={style.text_center}>
             <Text style={style.emergency_type}>
               {this.props.data.emergency_type}
             </Text>
             <Text style={style.status}>
               {this.props.data.status}
             </Text>
             <Text style={style.address}>
               {this.props.data.address}
             </Text>
             <Text style={style.created}>
               {this.props.data.created}
             </Text>
             <Text style={style.machines}>
               {machines}
             </Text>
           </View>
           </View>
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
    borderWidth: 3,
    padding: 20,
    margin: 5,
    borderRadius: 10,
    borderColor: '#FF620E',
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
