import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions  } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    region: null, 
    markers : null
  };
  
  async componentDidMount() 
  {
    await this.AskPermission(); // Check that we have permission to access location data - ask if we don't 
    this.watchId = Location.watchPositionAsync(
      {accuray:Location.Accuracy.BestForNavigation , timeInterval:1000, distanceInterval:1,  mayShowUserSettingsDialog:true},
      (currentPosition) => {
        this.setState({
          location:currentPosition,
          region: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          marker: {
                  latlng :currentPosition.coords
          },
          error: null,
        });
      }
    );
  }

  componentWillUnmount() 
  {
    this.watchId.remove(); // stop watching for location changes
  }

 AskPermission  = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('Asking for geo permission: ' + status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  };

  render() {
  const {location} = this.state; // Taking location from overall state object

    let text = 'Venter på mine koordinater ..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = "timestamp:"+location.timestamp + "\n"+ " Længdegrad: " + location.coords.longitude + "\n" +" Breddegrad: " + location.coords.latitude;
    }

    return (
      <View style={styles.container}>

      <Text style={styles.paragraph}>Hvor skal man gå hen i dag ....</Text>

      {this.state.region ? 
      ( <MapView style={styles.mapStyle}   region={this.state.region} >
            <Marker  coordinate={this.state.marker.latlng} title ='Tomasok' description = 'På vej igen ..' pinColor = 'gold'/>
       </MapView> )
        : null}

        <Text style={styles.paragraph}>{text}</Text>

      </View>
    );
  }

}
// ******************************************************
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
    height: Dimensions.get('window').height*2/3,
  },
});