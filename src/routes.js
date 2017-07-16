import { TabRouter } from 'react-navigation';

import { RadioScreen, ThanksScreen, EmergenciesListScreen } from './Screens';

module.exports = TabRouter({
  EmergenciesList: {
    screen: EmergenciesListScreen,
    path: 'emergency',
  },
  Radio: {
    screen: RadioScreen,
    path: 'radio',
  },
  Thanks: {
    screen: ThanksScreen,
    path: 'thanks',
  },
},{
  initialRouteName: 'EmergenciesList',
});