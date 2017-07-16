import React from 'react';
import { View, Text } from 'react-native';

 import styles from './../styles/main.style';

const ThanksScreen = ({ navigation }) => (
  <View style={{flex: 1, alignItems: 'center', margin: 20}}>
    <Text>App mobile para que los bomberos pueden llegar rapido a emergencias diarias(y al hacer click se abre la app de waze con la ruta más corta para poder llegar rapido y así poder salvar vidas) </Text>
    <Text style={{marginTop: 10}}>
      * Eduardo Telaya - luis.eduardo.telaya@gmail.com - edutrul
      * Benji Santos - santsben@gmail.com - programemos
      * Alexandra Bellido - alexandrabr23@gmail.com - alexabr23
      Especial agradecimiento a:
      Dios todo poderoso
      David Antonio Vilca por el diseño de las apps(davidvilcao@gmail.com)
      Todos los amigos, familiares por creer en nosotros y a los bomberos que se sacrificaron por nosotros y también por haber sino nuestros betatesters
    </Text>
  </View>
)

export default ThanksScreen;