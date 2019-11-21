import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, style, flexDirection, Button, TouchableOpacity } from 'react-native';


export default function App() {
  


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/bike.jpg')}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        
        <Image
          source={require('./assets/logo.png')}
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
            }}>
        Take an image of your bike when you've parked it. Open the map, when you need to find it!
          </Text>
        </View>

      
        
          <TouchableOpacity style={styles.button} onPress={() => this.cameraPage()}>
          <Image source={require('./assets/camera.png')}  style={styles.imgbtn}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.mapPage()}>
          <Image source={require('./assets/map.png')}  style={styles.imgbtn}/>
          </TouchableOpacity>
      {/* Indhold */}
      </ImageBackground>
    </View>
  );
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