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

  render() {
    return (
      <View>
        <Image source={{ uri: this.state.currentImage }}/>
      </View>
    );
  }
}
