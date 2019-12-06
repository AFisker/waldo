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
        {this.state.imageURI !== null && <Image source={{ uri: this.state.imageURI }} style={{width:"100%",height:"100%"}}/>}
      </View>
    );
  }
  
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

// add imageStyle, text and buttons.
// Denne side skal kopieres så den kan poppe op når brugeren har fundet sin cykel.
