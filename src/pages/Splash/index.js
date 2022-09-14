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
import { apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);


  useEffect(() => {



    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      } else {


        axios.post(apiURL + 'cek.php', {
          fid_user: res.id
        }).then(x => {
          console.warn(x.data);

          if (x.data == 404) {
            console.log('update status');
            setTimeout(() => {
              navigation.replace('Home');
            }, 1500);
          } else {
            console.log('new input');
            setTimeout(() => {
              navigation.replace('SInput');
            }, 1500);
          }
        })


      }
    });

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
