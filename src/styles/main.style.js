import { Platform, StyleSheet } from 'react-native';

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
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'arial',
  },

  inlineNav: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 5
  },
});

export default styles;