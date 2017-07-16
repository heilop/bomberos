import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import styles from './styles/main.style';

class Nav extends React.Component {
  render() {
    const navigation = this.props.navigation;
    const { routes } = navigation.state;
    let icon;
    return (
      <View>
        <View style={styles.inlineNav}>
          {routes.map(function(route) {
            let isTabActive = routes[navigation.state.index].key == route.key;
            switch (route.routeName) {
              case 'EmergenciesList':
                icon = isTabActive ? require('./images/icons/flame_1.png') : require('./images/icons/flame_1.png');
              break;
              case 'Radio':
                icon = isTabActive ? require('./images/icons/radio_1.png') : require('./images/icons/radio_white_1.png');
              break;
              case 'Thanks':
                icon = isTabActive ? require('./images/icons/helmet_1.png') : require('./images/icons/helmet_white_1.png');
              break;
              default:
                icon = isTabActive ? require('./images/icons/flame_1.png') : require('./images/icons/flame_1.png');
              break;
            }

            return <TouchableOpacity
              onPress={() => navigation.navigate(route.routeName)}
              key={route.routeName}>
              <Image source={icon} />
            </TouchableOpacity>
          })}
        </View>
      </View>
      
    )
  }
};

export default Nav;