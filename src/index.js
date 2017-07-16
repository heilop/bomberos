import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { createNavigator, createNavigationContainer, addNavigationHelpers } from 'react-navigation';

import Routes from './routes';
import Nav from './nav';

import styles from './styles/main.style';

const MainView = ({ router, navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={styles.container}>
      <Text style={styles.titleMain}>Bomberos Perú</Text>
      <Nav navigation={navigation} />
      <ActiveScreen
        navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}
      />
    </View>
  );
};

const Main = createNavigationContainer(
  createNavigator(Routes)(MainView)
);

export default Main;