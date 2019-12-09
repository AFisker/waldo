import React from 'react';
import {
  StyleSheet,
  Style,
  TouchableOpacity,
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

        <TouchableOpacity style={styles.button3} onPress={() => this.props.navigation.navigate('camerascreen')}>
        <Text style={styles.header}>Are You Satisfied With Your Image?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('camerascreen')}>
        <Text style={styles.text}>NO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('mapscreen')}>
        <Text style={styles.text}t>Yes</Text>
        </TouchableOpacity>

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
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      margin: 10,
      backgroundColor: 'red',
      width: 80,
      height: 50,
      position: 'absolute',
      bottom: 30,
      left: 40,
    },
    button2: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      margin: 10,
      backgroundColor: 'green',
      width: 80,
      height: 50,
      position: 'absolute',
      bottom: 30,
      right: 40,
    },
    button3: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        margin: 10,
        backgroundColor: 'rgba(255, 241, 113, 0.7)',
        width: 280,
        height: 80,
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 370,
      },
    header: {
        justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      fontWeight: 'bold',
      fontSize: 22,
      // marginTop: '15%',
      color: 'white',
    
      },
    text: {
      justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: '15%',
      color: 'white',
  
    },

  });

// add imageStyle, text and buttons.
// Denne side skal kopieres så den kan poppe op når brugeren har fundet sin cykel.
