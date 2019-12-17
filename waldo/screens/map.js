import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
// import mapViewdirections

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as geolib from 'geolib';

export default class MapScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    region: null,
    markers: null,
    compareLocation: null,
  };

  myBikeLocation = async () => {
    // Fetching bikeLocation
    try {
      const value = await AsyncStorage.getItem("bikeLocation");
      if (value !== null) {
        this.setState({
          bikeLocation : JSON.parse(value), // Transforming the local data into a useable objekt
          });
        return 1;
        }
      else return 0;
    } catch (e) {
      return -1;
    }
  }

  async componentDidMount() {
    let succeeded = await this.myBikeLocation();
    await this.AskPermission(); // Check that we have permission to access location data - ask if we don't 
    this.watchId = await Location.watchPositionAsync(
      { accuray: Location.Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 1, mayShowUserSettingsDialog: true },
      (currentPosition) => {
        this.setState({
          location: currentPosition,
          region: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          compareLocation: geolib.isPointWithinRadius(
            { latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude },
            { latitude: this.state.bikeLocation.coords.latitude, longitude: this.state.bikeLocation.coords.longitude },
            10 
          ),
          marker: {
            latlng: currentPosition.coords
          },
          error: null,
        });
        console.log(this.state.compareLocation);
      }
    );
  }
  
  componentWillUnmount() {
    // stop watching for location changes
    if (this.watchId != undefined)
      this.watchId.remove();
      
  }

  AskPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('Asking for geo permission: ' + status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'In order to make the app functional, permission to use the camera is required',
      });
    }
  };

  render() {

    return (
      
      
      <View style={styles.container}>

        {this.state.region ?
          (<MapView showsUserLocation style={styles.mapStyle} initialRegion={this.state.region} >
            <Marker coordinate= {this.state.bikeLocation.coords} title='Mybike' description='Find Waldo' pinColor='red' />
            <Circle center= {this.state.bikeLocation.coords} 
                    radius= "10"
                    strokeWidth={1} 
                    fillColor="grey"/>
          </MapView>)
         
          : null}
    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('homescreen')}>
             <Image source={require('../assets/homebtn.png')} style={styles.imgbtn} />
           </TouchableOpacity>


      </View>
    );
  }

}

// **** ***<Text style={styles.paragraph}>Hvor skal man gå hen i dag ....</Text>*************<Text style={styles.paragraph}>{text}</Text>**********************************
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, // * 4 / 5,
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 75,
    height: 75,
    borderRadius: 150,
    margin: 10,
    position: 'absolute',
    top: 35,
    left: 25,
    justifyContent: 'center',
  },
  imgbtn: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 55,
    height: 42,
  },
});