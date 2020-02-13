import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screen/home';
import VisitorLogScreen from '../screen/visitorLog';

const NavigationStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    VisitorLog: {
      screen: VisitorLogScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
)

const NavigationContainer = createAppContainer(NavigationStack);
export default NavigationContainer;
