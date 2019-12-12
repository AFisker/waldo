import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import {Platform} from 'react-native';
import {AsyncStorage} from 'react-native';



<FontAwesome
  name="camera"
  style={{ color: "#fff", fontSize: 40}}
/>

export default class CameraScreen extends React.Component {
  
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
      location: null,
      errorMessage: null,
      region: null,
      markers: null
    };

  /*async componentDidMount() {

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }*/

  async componentDidMount() {
    this.getPermissionAsync()
  }  
  getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
    }

    takePicture = async () => {
      try {
        const imageData = await this.camera.takePictureAsync({
          fixOrientation: true
        });
        this.setState({
          imageUri: imageData.uri
        });
        await this._saveImageAsync();
      } catch (err) {
        console.log("err: ", err);
      }
    };

    getLocation = async () => {
      await this.AskPermission();
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
          console.log();
        }
      );
    };
  
    _saveImageAsync = async () => {
      await AsyncStorage.setItem("imageUri", this.state.imageUri);
      this.props.navigation.navigate('showimage');
      // this.props.navigation.navigate("map"); viker ikke
      console.log(this.state.imageUri)
    };

    AskPermission = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      console.log('Asking for geo permission: ' + status);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
    };

  
  render() {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
           
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between"}}>
            <Camera   ref={ref => {this.camera = ref}} 
                      style={{ flex: 1 }} type={this.state.cameraType}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                 // alignItems: 'center',
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  bottom: 50
                }}
                onPress= {() => { this.takePicture(); this.getLocation();}}>
                  
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>

            </Camera>
        </View>
        
      );
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});