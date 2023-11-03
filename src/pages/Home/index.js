import { Alert, StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Home({ navigation, route }) {


  const [item, setItem] = useState({})


  useEffect(() => {

    getData('user').then(u => {
      axios.post(apiURL + 'get_last.php', {
        fid_user: u.id
      }).then(res => {
        console.warn('get last', res.data)
        setItem(res.data)
      })
    })


  }, [])

  return (
    <ImageBackground source={require('../../assets/back.png')}
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image
          source={{
            uri: item.image
          }}
          style={
            {
              width: 150,
              borderRadius: 10,
              height: 100,
              resizeMode: 'contain'
            }
          }
        />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: colors.white,
            fontFamily: fonts.primary[600],
            fontSize: windowWidth / 12
          }}>{item.nama_kategori}</Text>
        </View>
      </View>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          padding: 20,
          backgroundColor: colors.success,
          width: 200,
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          borderRadius: 100,
        }}><Text style={{
          fontFamily: fonts.primary[600],
          color: colors.white,
          fontSize: windowWidth / 15,
          textAlign: 'center'
        }}>Terima kasih</Text></View>


        <Text style={{
          fontFamily: fonts.primary[400],
          color: colors.white,
          fontSize: windowWidth / 30,
          marginVertical: 20,
          textAlign: 'center'
        }}>Selamat bekerja, tetap utamakan K3 dalam bekerja.</Text>

      </View>

      <View>
        <Text style={{
          fontFamily: fonts.primary[400],
          color: colors.danger,
          fontSize: windowWidth / 30,
          marginVertical: 20,
          textAlign: 'center'
        }}>Sudah selesai dengan pekerjaan anda? Atau unit anda terkedala Breakdown?
          Silahkan Update Status dengan Klik di bawah ini</Text>
        <MyButton onPress={() => {

          navigation.navigate('SCek', item)
        }} title="Update Status" warna={colors.white} colorText={colors.danger} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 35
  },
  item: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 35
  }
})