import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, style, flexDirection, Button, TouchableOpacity } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/home';
import CameraScreen from './screens/camera';
import MapScreen from './screens/map';
import ShowImage from './screens/image';
import BikeFound from './screens/bikeFound',

const AppNavigator = createStackNavigator(
  
  {
    homescreen: HomeScreen,
    camerascreen: CameraScreen,
    mapscreen: MapScreen,
    showimage: ShowImage,
    bikefound: BikeFound,
  },
  {
    initialRouteName: 'homescreen',
    header: null,
    headerMode: 'none'//fjerner header på alle skærme, når det står sådan her! dvs. at det også fjerner den indfødte "back" knap der følger med map API'en
  }

);

const AppContainer = createAppContainer(AppNavigator);



export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}
