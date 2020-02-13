import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screen/home';
import VisitorLogScreen from '../screen/visitorLog';
import AppStateScreen from '../screen/appstate';

const NavigationTabs = createMaterialTopTabNavigator(
  {
    Home: {screen: HomeScreen},
    Visitor: {screen: VisitorLogScreen},
    AppState: {screen: AppStateScreen},
  },
  {
    initialRouteName: 'Home',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: false,
      style: { height: 0 },
    },
  }
)

export default createAppContainer(NavigationTabs);
