// import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screen/home';
import VisitorLogScreen from '../screen/visitorLog';
import SendingEmailScreen from '../screen/sendingemail';

const NavigationTabs = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Visitor: VisitorLogScreen,
    SendEmail: SendingEmailScreen,
  },
  {
    initialRouteName: 'Visitor',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: false,
      style: {height: 0},
    },
    lazy: true,
  },
);

export default createAppContainer(NavigationTabs);
