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
  RefreshControl,
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Image,
  Linking
 } = ReactNative;

import styles from './styles/main.style';

// Emergency.
import Emergency from './components/Emergency';
// Adds SpalshScreen thanks to crazycodeboy/react-native-splash-screen
import SplashScreen from 'react-native-splash-screen';

// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

import { StackNavigator } from 'react-navigation';

class EmergenciesListScreen extends React.Component {

  static navigationOptions = {
    header: null
  };
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
    this.setState({ text });
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

    this.setState({ rowData: json })
  }

  render() {
    const { navigate } = this.props.navigation;
    const rows = this.state.rowData.map((row, ii) => {
      // @TODO: Change machines to station.
      if (row.fire_stations.includes(this.state.text)) {
        return <Emergency key={ii} data={row} onClick={this._onClick} />;
      }
      else if (this.state.text == '') {
        return <Emergency key={ii} data={row} onClick={this._onClick} />;
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
            <TouchableHighlight onPress={() => navigate('EmergenciesListScreen')}>
              <Image source={require("./images/icons/flame_1.png")} />
            </TouchableHighlight>
          </View>
          <View style={styles.centerNav}>
            <TouchableHighlight onPress={() => navigate('RadioScreen')}>
              <Image source={require("./images/icons/radio_white_1.png")} />
            </TouchableHighlight>
          </View>
          <View style={styles.rightNav}>
            <TouchableHighlight onPress={() => navigate('ThanksScreen')}>
              <Image source={require("./images/icons/helmet_white_1.png")} />
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
    this.setState({ isRefreshing: true });
    this.fetchData().done();
    this.setState({ isRefreshing: false });
  };
}

class RadioScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  turnOnOrOff() {
    const url = "http://audio7.broadcastify.com/s4rn6m17kbhx.mp3";
    // ReactNativeAudioStreaming.play(url, { showIniOSMediaCenter: true, showInAndroidNotifications: true });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.titleMain}>
          Bomberos Perú
        </Text>
        <View style={styles.inlineNav}>
          <View style={styles.leftNav}>
            <TouchableHighlight onPress={() => navigate('EmergenciesListScreen')}>
              <Image source={require("./images/icons/flame_1.png")} />
            </TouchableHighlight>
          </View>
          <View style={styles.centerNav}>
            <TouchableHighlight onPress={() => navigate('RadioScreen')}>
              <Image source={require("./images/icons/radio_white_1.png")} />
            </TouchableHighlight>
          </View>
          <View style={styles.rightNav}>
            <TouchableHighlight onPress={() => navigate('ThanksScreen')}>
              <Image source={require("./images/icons/helmet_white_1.png")} />
            </TouchableHighlight>
          </View>
        </View>
        <Text>Presionar para iniciar y vuelve a presionar para pausear</Text>
        <TouchableHighlight onPress={this.turnOnOrOff}>
          <Image source={require("./images/icons/group.png")} />
        </TouchableHighlight>
      </View>
    );
  }
}


class ThanksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.titleMain}>
          Bomberos Perú
              </Text>
        <View style={styles.inlineNav}>
          <View style={styles.leftNav}>
            <TouchableHighlight onPress={() => navigate('EmergenciesListScreen')}>
              <Image source={require("./images/icons/flame_1.png")} />
            </TouchableHighlight>
          </View>
          <View style={styles.centerNav}>
            <TouchableHighlight onPress={() => navigate('RadioScreen')}>
              <Image source={require("./images/icons/radio_white_1.png")} />
            </TouchableHighlight>
          </View>
          <View style={styles.rightNav}>
            <TouchableHighlight onPress={() => navigate('ThanksScreen')}>
              <Image source={require("./images/icons/helmet_white_1.png")} />
            </TouchableHighlight>
          </View>
        </View>
        <Text>App mobile para que los bomberos pueden llegar rapido a emergencias diarias(y al hacer click se abre la app de waze con la ruta más corta para poder llegar rapido y así poder salvar vidas)
                Creditos:
                * Eduardo Telaya - luis.eduardo.telaya@gmail.com - edutrul
                * Benji Santos - santsben@gmail.com - programemos
                * Alexandra Bellido - alexandrabr23@gmail.com - alexabr23
                Especial agradecimiento a:
                Dios todo poderoso
                David Antonio Vilca por el diseño de las apps(davidvilcao@gmail.com)
                Todos los amigos, familiares por creer en nosotros y a los bomberos que se sacrificaron por nosotros y también por haber sino nuestros betatesters</Text>
      </View>
    );
  }
}

const bomberos = StackNavigator(
  {
    EmergenciesListScreen: { screen: EmergenciesListScreen },
    RadioScreen: { screen: RadioScreen },
    ThanksScreen: { screen: ThanksScreen },
  },
  { headerMode: 'screen' }
);

export default bomberos;
