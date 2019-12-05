import React from 'react';
import {
  StyleSheet,
  style,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from 'react-native';

export default class ShowImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURI: null
        }
    }

    currentImage = async () => {
        //const currentImage = this.state.currentImage;
        try {
          const value = await AsyncStorage.getItem('imageUri');
          console.log(value);
          if (value !== null) {
            this.setState({imageURI:value});
            return 1;
            }
          else return 0;
        } catch (e) {
          return -1;
        }
      }

 async componentDidMount() {
     // fetch image
     let succeeded = await this.currentImage();

 }

  render() {
    return (
      <View>
        {this.state.imageURI !== null && <Image source={{ uri: this.state.imageURI }} style={{width:300,height:300}}/>}
      </View>
    );
  }
}
