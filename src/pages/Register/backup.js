import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowHeight } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL } from '../../utils/localStorage';

export default function Register({ navigation }) {


    const [data, setData] = useState([]);

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {


                if (item.id == 3) {
                    navigation.navigate('Login', item)
                } else {

                    Alert.alert('MOCO U', 'Silahkan melakukan aktivasi terlebih dahulu untuk menggunakan fitur ini')
                }
            }} style={{
                flex: 1,
                backgroundColor: colors.white,
                margin: 10,

            }}>
                <Image style={{
                    width: '100%',
                    height: 150,
                }} source={{
                    uri: item.image
                }} />
                <Text style={{
                    textAlign: 'center',
                    padding: 10,
                    fontFamily: fonts.primary[600]
                }}>{item.nama_kategori}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        axios.post(apiURL + 'kategori.php').then(res => {
            setData(res.data);
        })
    }, [])

    return (
        <ImageBackground
            source={require('../../assets/back.png')}
            style={{
                flex: 1,
            }}>
            <View style={{
                height: windowHeight / 10,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
            }}>
                <Image
                    source={require('../../assets/top.png')}
                    style={
                        {
                            width: 150,
                            height: 60,

                        }
                    }
                />
            </View>

            <FlatList numColumns={2} data={data} renderItem={__renderItem} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
