import React from 'react';
import { StyleSheet,TouchableOpacity,View,Image,Text,AsyncStorage } from 'react-native';

export default class BikeFound extends React.Component {
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
      if (value !== null) {
        this.setState({ imageURI: value });
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

  pressYes = async () => {
    await AsyncStorage.multiRemove(['bikeLocation','imageUri'])
    this.props.navigation.navigate('homescreen');
  }

  render() {
    return (

      <View>

        {this.state.imageURI !== null && <Image source={{ uri: this.state.imageURI }} style={{ width: "100%", height: "100%" }} />}

        <View style={styles.textBox}>
          <Text style={styles.header}>Thumbs Up, When You've Found Your Bike!</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/kompas.png')} style={styles.imgbtn1} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={this.pressYes}>
          <Image source={require('../assets/up.png')} style={styles.imgbtn2} />
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
    margin: 10,
    width: 75,
    height: 75,
    borderRadius: 150,
    position: 'absolute',
    bottom: 30,
    left: 65,
  },
  button2: {
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 75,
    height: 75,
    borderRadius: 150,
    position: 'absolute',
    bottom: 30,
    right: 65,
  },

  imgbtn1: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 55,
    width: 55,
    marginTop: 12,

  },

  imgbtn2: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    width: 55,
    marginTop: 7,

  },

  textBox: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 240,
    height: 80,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: '20%',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,

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
