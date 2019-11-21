import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, style } from 'react-native';


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
         <Image
          source={require('./assets/buttonMap.png')}
          style={{
            width: '30%',
            height: '30%',
          }}
          resizeMode={'contain'}
        />
         <Image
          source={require('./assets/buttonMap.png')}
          style={{
            width: '30%',
            height: '30%',
          }}
          resizeMode={'contain'}
        />
        <Text style={{paddingtop: 50}}>The best Bike Finder On The Market</Text>
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