import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';


export default class HomeScreen extends React.Component {

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

          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 20,
                textAlign: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: -40,
              }}>
              Take an image of your bike when you've parked it. Open the map, when you need to find it!
              </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('camerascreen')}>
            <Image source={require('../assets/cam.png')} style={styles.imgbtn1} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('mapscreen')}>
            <Image source={require('../assets/newmap.png')} style={styles.imgbtn2} />
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
    borderRadius: 150,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 30,
    left: 40,
    borderWidth: 1,
    borderColor: 'white',
    left: 65,
  },
  button2: {
    borderRadius: 150,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 30,
    right: 40,
    borderWidth: 1,
    borderColor: 'white',
    right: 65,
  },
  imgbtn1: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 50,
    height: 40,
    marginTop: 15,

  },

  imgbtn2: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 42,
    height: 44,
    marginTop: 15,

  }
});