import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, ImageBackground, Switch } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { apiURL, storeData } from '../../utils/localStorage';
import { maskJs, maskCurrency } from 'mask-js';
import sha256 from 'crypto-js/sha256';
import sha1 from 'js-sha1'


export default function ({ navigation, route }) {

    const item = route.params;
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {

        !isEnabled ? setIsEnabled(true) : setIsEnabled(false);
        setKirim({
            ...kirim,
            breakdown: !isEnabled ? 1 : 0
        })
    };
    const [unit, setUnit] = useState([]);

    useEffect(() => {
        axios.post(apiURL + 'get.php').then(d => {
            setUnit(d.data);
        })
    }, [])

    const [kirim, setKirim] = useState({

        kode: route.params.kode,
        breakdown: 0,

    });
    const [loading, setLoading] = useState(false);



    const masuk = () => {



        setLoading(true);
        console.log(kirim);
        setTimeout(() => {
            axios
                .post(apiURL + 'update.php', kirim)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.kode == 50) {

                        alert(res.data.msg);

                    } else {

                        navigation.replace('STentang', kirim);
                    }
                });
        }, 1200);







    }

    return (
        <ImageBackground
            source={require('../../assets/back.png')}
            style={{
                flex: 1,
                padding: 10,
            }}>
            <ScrollView style={{}}>
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
                <Text style={{
                    color: colors.white,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 35,
                }}>Di isi setelah pekerjaan berakhir / apabila ada kendala (Breakdown Unit)</Text>


                <MyGap jarak={5} />
                <View style={{ padding: 0, marginVertical: 10, flex: 1 }}>


                    <MyInput maxLength={5} label="Jam Akhir Operasi / Unit Breakdown" value={kirim.jam_akhir} onChangeText={val => setKirim({
                        ...kirim,
                        jam_akhir: maskJs('99:99', val)
                    })} placeholder="masukan jam awal operasi" keyboardType='number-pad' />



                    <MyGap jarak={5} />
                    <MyInput label="HM Akhir" onChangeText={val => setKirim({
                        ...kirim,
                        hm_akhir: val
                    })} placeholder="masukan hm akhir" keyboardType='number-pad' />

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}>
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            color: colors.danger
                        }}>Klik Apabila Breakdown</Text>
                    </View>


                    {isEnabled && <View>
                        <MyGap jarak={5} />
                        <MyInput label="Kendala Breakdown" onChangeText={val => setKirim({
                            ...kirim,
                            kendala: val
                        })} placeholder="Di isi apabila Unit terkendala Breakdown" />

                    </View>}
                    <MyGap jarak={5} />
                    <MyInput label="Estimasi Pengerjaan" onChangeText={val => setKirim({
                        ...kirim,
                        estimasi: val
                    })} placeholder="masukan estimasi" />




                    <Text style={{
                        marginVertical: 5,
                        color: colors.primary,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                    }}>Klik kirim untuk mengakhiri pekerjaan
                        atau kendala breakdown</Text>




                    {!loading && <MyButton
                        onPress={masuk}
                        title="KIRIM"
                        warna={colors.danger}
                        Icons="cloud-upload-outline"
                    />}

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
