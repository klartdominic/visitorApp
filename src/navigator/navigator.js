import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screen/home';
import VisitorLogScreen from '../screen/visitorLog';

const NavigationTabs = createMaterialTopTabNavigator(
  {
    Home: {screen: HomeScreen},
    Visitor: {screen: VisitorLogScreen}
  },
  {
    initialRouteName: 'Home',
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: false,
      style: { height: 0 }
    }
  }
)

export default createAppContainer(NavigationTabs);
