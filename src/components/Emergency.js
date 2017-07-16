/**
 * @file
 * This is Emergency component which represents row in timeline for every emergency.
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

class Emergency extends React.Component {
  _onClick = () => {
    this.props.onClick(this.props.data);
  };

  render() {
    const machines = this.props.data.machines.toString();
    const emergency_type = this.props.data.emergency_type.replace(/\s+/g, '-').toLowerCase();
    const IMAGES = {
      'accidente-vehicular': require('../images/accidente-vehicular.png'),
      'emergencia-medica': require('../images/emergencia-medica.png'),
      'incendio': require('../images/incendio.png'),
      'materiales-peligrosos': require('../images/materiales-peligrosos.png'),
      'rescate': require('../images/rescate.png'),
      'servicios-especial': require('../images/servicio-especial.png'),
    };
    /* @TODO: Replace <Image Source=... with this.props.data.emergency_type*/
    return (
      <TouchableWithoutFeedback onPress={this._onClick}>
        <View style={styles.row}>
          <Image style={styles.backgroundImage} source={require('../images/background/card_active_1.png')}>
            <View style={styles.groupLeft}>
              <View style={styles.text_center}>
                <Text style={styles.emergency_type}>
                  {this.props.data.emergency_type}
                </Text>
                <Text style={styles.status}>
                  {this.props.data.status}
                </Text>
                <Text style={styles.address}>
                  {this.props.data.address.length > 70 ? `${this.props.data.address.slice(0, 70)}...` : this.props.data.address}
                </Text>
                <Text style={styles.created}>
                  <Image source={require('../images/icons/clock_2.png')} /> {this.props.data.created}
                  <Image source={require('../images/icons/fire_truck_2.png')} />{machines}
                </Text>
              </View>
            </View>
            <Image style={styles.iconPointer} source={require('../images/icons/pointer_1.png')}></Image>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row'
  },

  row: {
    borderRadius: 8,
    backgroundColor: '#E83A4F',
    margin: 5,
  },

  iconPointer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: .15,
    margin: 15,
    marginBottom: 60,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  groupLeft: {
    alignSelf: 'flex-start',
    flex: .85,
    marginTop: 17,
  },

  backgroundImage: {
    borderRadius: 5,
    width: null,
    marginRight: 4,
    marginTop: 10,
    resizeMode: 'cover',
    flex: 1,
    flexDirection: 'row'
  },

  padding_left: {
    paddingLeft: 15,
  },

  padding_top: {
    paddingTop: 20
  },

  created: {
    color: 'white',
    alignSelf: 'flex-start',
    bottom: 0,
    justifyContent: 'space-between',
    marginTop: 10,
    fontSize: 11,
  },

  status: {
    color: '#F6A623',
    fontWeight: '700',
    fontSize: 15,
    paddingBottom: 5
  },

  machines: {
    color: 'white',
    alignSelf: 'flex-end'
  },

  text_center: {
    paddingLeft: 20,
  },

  scrollview: {
    flex: 1,
  },

  address: {
    color: 'white',
    fontSize: 11,
  },

  emergency_type: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },

});

export default Emergency;
