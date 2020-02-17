import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../screen/home';
import VisitorLogScreen from '../screen/visitorLog';
import AppStateScreen from '../screen/appstate';

// const SwitchNavigator = createSwitchNavigator(
//   {
//     Visitor:  VisitorLogScreen,
//   }
// )

const NavigationTabs = createMaterialTopTabNavigator(
  {
    Home:  HomeScreen,
    Visitor: VisitorLogScreen,
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
    lazy: true,
  }
)

// const NavigationTabs = createSwitchNavigator(
//   {
//     Home: HomeScreen,
//     Visitor: VisitorLogScreen,
//   },
//   {
//     initialRouteName: 'Home',
//     swipeEnabled: true,
//   }
// )

export default createAppContainer(NavigationTabs);
