import React, { useState } from 'react';
import { StyleSheet, ImageBackground, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, storeData } from '../../utils/localStorage';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      alert('username dan Passwoord tidak boleh kosong !');
    } else if (kirim.username == null) {
      alert('username tidak boleh kosong !');
    } else if (kirim.password == null) {
      alert('Passwoord tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);
      setTimeout(() => {
        axios
          .post(apiURL + 'login.php', kirim)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {

              alert(res.data.msg);

            } else {
              storeData('user', res.data);
              navigation.replace('Home');
            }
          });
      }, 1200);


    }




  }

  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={{
        flex: 1,
      }}>

      <ScrollView style={{ flex: 1, }}>
        <View style={{
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
        <MyGap jarak={10} />
        <View style={{ padding: 10, marginVertical: 20, flex: 1 }}>
          <MyInput label="Username" onChangeText={val => setKirim({
            ...kirim,
            username: val
          })}


            iconname="at" placeholder="Masukan username Anda" />
          <MyGap jarak={20} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Password"
            iconname="key"
            placeholder="Masukan password Anda"
          />
          <MyGap jarak={40} />
          {!loading && <MyButton
            onPress={masuk}
            title="LOGIN SEKARANG"
            warna={colors.primary}
            Icons="log-in-outline"
          />}
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
            padding: 10,
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center'
          }}><Text style={{
            fontSize: windowWidth / 25,
            fontFamily: fonts.primary[600],
            textAlign: 'center',
            color: colors.white
          }}>Belum punya user ? silahkan daftar disini</Text></TouchableOpacity>
        </View>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
