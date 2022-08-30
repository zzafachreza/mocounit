import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);


  useEffect(() => {




    setTimeout(() => {
      navigation.replace('Register');
    }, 1500);

  }, []);


  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View style={{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {/* <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: windowWidth - 50,
              height: 200
            }
          }
        /> */}

        <ActivityIndicator size="large" color={colors.white} />
      </View>

      <View style={{
        opacity: 0.7,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image
          source={require('../../assets/turangga.png')}
          style={
            {
              width: 150,
              height: 50,
              resizeMode: 'contain',
            }
          }
        />
        <Image
          source={require('../../assets/top.png')}
          style={
            {
              width: 150,
              resizeMode: 'contain',
              height: 100,

            }
          }
        />
      </View>
      <View style={{
        backgroundColor: colors.primary,
        opacity: 0.7,
      }}>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          fontFamily: fonts.primary[600],
          fontSize: windowWidth / 25,
          textAlign: 'center',
        }}>
          PT Telen Orbit Prima
        </Text>
        <Text style={{
          color: colors.black,
          fontFamily: fonts.primary[400],
          fontSize: windowWidth / 25,
          marginBottom: 20,
          textAlign: 'center',
        }}>Moco Unit Port Teluk Timbau</Text>
      </View>

    </ImageBackground >
  );
}

const styles = StyleSheet.create({});
