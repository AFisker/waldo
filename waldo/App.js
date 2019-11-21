import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, style, flexDirection, Button, TouchableOpacity } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/home';
import CameraScreen from './screens/camera';
import MapScreen from './screens/map';


const AppNavigator = createStackNavigator(
  {
    homescreen: HomeScreen,
    camerascreen: CameraScreen,
    mapscreen: MapScreen
  },
  {
    initialRouteName: 'homescreen'
  }
);

const AppContainer = createAppContainer(AppNavigator);



export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}
