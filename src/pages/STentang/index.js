import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyButton } from '../../components'

export default function STentang({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SInput')
        }, 1200)
    }, [])

    return (


        <ImageBackground source={require('../../assets/back.png')}
            style={{
                flex: 1,
                padding: 10,
            }}>

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
                    fontSize: windowWidth / 15
                }}>Terima kasih</Text></View>


                <Text style={{
                    fontFamily: fonts.primary[400],
                    color: colors.white,
                    fontSize: windowWidth / 20,
                    marginVertical: 20,
                    textAlign: 'center'
                }}>Terimakasih telah bekerja penuh hari ini.
                    Selamat Beristirahat...</Text>

            </View>


        </ImageBackground>
    )
}

const styles = StyleSheet.create({})