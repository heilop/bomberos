import React from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';

 import styles from './../styles/main.style';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

const RadioScreen = ({ navigation }) => {
  const turnOnOrOff = () => {
    const url = "http://audio7.broadcastify.com/s4rn6m17kbhx.mp3";
    ReactNativeAudioStreaming.play(url, { showIniOSMediaCenter: true, showInAndroidNotifications: true });
  }
  return (
    <View style={{flex: 1, alignItems: 'center', margin: 20}}>
      <Text>Presionar para iniciar y vuelve a presionar para pausear</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableHighlight onPress={this.turnOnOrOff}>
          <Image source={require("./../images/icons/group.png")} />
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default RadioScreen;
