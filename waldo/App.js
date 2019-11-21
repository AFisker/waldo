import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, style, flexDirection, Button } from 'react-native';


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

        <Text 
        style={{
          fontWeight: 'bold', 
          color: 'white', 
          fontSize: 20,
          textAlign: 'center',
          }}>
        Take an image of your bike when you've parked it. Open the map, when you need to find it!
        </Text>

         <Image
          source={require('./assets/camera.png')}
          style={{
            width: '30%',
            height: '30%',
            position: 'absolute',
            bottom: -30,
            left: 0,
          }}
          resizeMode={'contain'}
        />
         <Image
          source={require('./assets/map.png')}
          style={{
            width: '30%',
            height: '30%',
            position: 'absolute',
            bottom: -30,
            right: 0,
          }}
          resizeMode={'contain'}
        />
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
});