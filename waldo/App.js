import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, style, flexDirection, Button, TouchableOpacity } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import home from './screens/home';
import camera from './screens/camera';
import map from './screens/map';



const AppNavigator = createStackNavigator (
  {
    homescreen : home,
    camerascreen : camera,
    mapscreen : map
  },
  {
    initialRouteName: 'homescreen'
  }
);

const AppContainer = createAppContainer(AppNavigator);



export default class App extends React.Component {
  
  render() {
  return <AppContainer/>;
  }
}
