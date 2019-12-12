import React, { useState, UseEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity, NativeModules } from 'react-native';
import Animation from './animation'
export default class HomeScreen extends React.Component {
static navigationOptions;

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/bike.jpg')}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: '100%',
              height: '30%',
              // backgroundColor: 'magenta',
            }}
            resizeMode={'contain'}
          />


          <Animation>
          
          </Animation>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('camerascreen')}>
            <Image source={require('../assets/camera.png')} style={styles.imgbtn} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('mapscreen')}>
            <Image source={require('../assets/map.png')} style={styles.imgbtn} />
          </TouchableOpacity>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    // borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    // backgroundColor: 'lightblue',
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 30,
    left: 40,
  },
  button2: {
    // borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    // backgroundColor: 'lightblue',
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 30,
    right: 40,
  },
  imgbtn: {
    justifyContent: 'center',
    alignSelf: 'center',

  }
});