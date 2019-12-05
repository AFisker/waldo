import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
  }

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
        this._saveImageAsync();
      } catch (err) {
        console.log("err: ", err);
      }
    };
  
    _saveImageAsync = async () => {
      await AsyncStorage.setItem("imageUri", this.state.imageUri);
      this.props.navigation.navigate("map");
      console.log(this.state.imageUri)
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
                onPress= {() => { this.takePicture(); this.props.navigation.navigate('showimage');}}>
                  
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