import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
// import mapViewdirections

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



export default class MapScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    region: null,
    markers: null
  };

  async componentDidMount() {
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
          marker: {
            latlng: currentPosition.coords
          },
          error: null,
        });
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
    const { location } = this.state; // Taking location from overall state object

    let text = 'Venter på mine koordinater ..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = "timestamp:" + location.timestamp + "\n" + " Længdegrad: " + location.coords.longitude + "\n" + " Breddegrad: " + location.coords.latitude;
    }

    return (
      <View style={styles.container}>

        

        {this.state.region ?
          (<MapView style={styles.mapStyle} initialregion={this.state.region} >
            <Marker coordinate={this.state.marker.latlng} title='Tomasok' description='På vej igen ..' pinColor='gold' /> 
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