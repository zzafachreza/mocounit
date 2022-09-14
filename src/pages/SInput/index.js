import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { maskJs, maskCurrency } from 'mask-js';
import sha256 from 'crypto-js/sha256';
import { sha1 } from 'react-native-sha1';
import moment from 'moment';


export default function ({ navigation, route }) {

    const [unit, setUnit] = useState([]);
    const [code, setCode] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.post(apiURL + 'get.php').then(d => {
            setUnit(d.data);
        });

        getData('user').then(u => {
            setUser(u);
            setKirim({
                ...kirim,
                fid_user: u.id
            });


        })



        sha1(moment().format("YYYYMMDDHHmmss").toString()).then(hash => {
            console.warn(hash);
            setKirim({
                ...kirim,
                kode: hash
            })
            // setCode(hash);
        })
    }, [])

    const [kirim, setKirim] = useState({
        shift: 'Shift 1',
        kode: code,
        fid_kategori: 3
    });
    const [loading, setLoading] = useState(false);



    const masuk = () => {



        setLoading(true);
        console.log(kirim);
        setTimeout(() => {
            axios
                .post(apiURL + 'add.php', kirim)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.kode == 50) {

                        alert(res.data.msg);

                    } else {

                        navigation.replace('Home', kirim);
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
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                        }}>Selamat Datang, {user.nama_lengkap}</Text>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                        }}>Sebelum memulai pekerjaan silahkan isi form To DO List di bawah ini !</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        storeData('user', null);
                        navigation.replace('Login')
                    }} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                        marginVertical: 5,
                    }}>

                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,

                        }}>Keluar</Text>
                    </TouchableOpacity>
                </View>




                <MyGap jarak={5} />
                <View style={{ padding: 0, marginVertical: 10, flex: 1 }}>

                    <MyPicker onValueChange={x => setKirim({
                        ...kirim,
                        shift: x
                    })} label="Shift" data={[
                        {
                            label: 'Shift 1',
                            value: 'Shift 1'
                        }, {
                            label: 'Shift 2',
                            value: 'Shift 2'
                        }
                    ]} />
                    <MyGap jarak={5} />
                    <MyInput label="Nama" onChangeText={val => setKirim({
                        ...kirim,
                        nama: val
                    })} placeholder="Masukan nama" />


                    <MyGap jarak={5} />
                    <MyInput label="NRP" onChangeText={val => setKirim({
                        ...kirim,
                        nrp: val
                    })} placeholder="Masukan nrp" />

                    <MyGap jarak={5} />

                    <MyPicker onValueChange={x => setKirim({
                        ...kirim,
                        nomor_unit: x
                    })} label="No Unit" data={unit} />

                    <MyGap jarak={5} />
                    <MyInput label="Pekerjaan / General" onChangeText={val => setKirim({
                        ...kirim,
                        pekerjaan: val
                    })} placeholder="Masukan pekerjaan / general" />

                    <MyGap jarak={5} />
                    <MyInput maxLength={5} label="Jam Awal Operasi" value={kirim.jam_awal} onChangeText={val => setKirim({
                        ...kirim,
                        jam_awal: maskJs('99:99', val)
                    })} placeholder="masukan jam awal operasi" keyboardType='number-pad' />



                    <MyGap jarak={5} />
                    <MyInput label="HM awal" onChangeText={val => setKirim({
                        ...kirim,
                        hm_awal: val
                    })} placeholder="masukan hm awal" keyboardType='number-pad' />


                    <Text style={{
                        marginVertical: 5,
                        color: colors.primary,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                    }}>Klik Start untuk memulai pekerjaan</Text>

                    <Text style={{
                        marginBottom: 10,
                        color: colors.danger,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                    }}>
                        Sebelum memulai pekerjaan anda,pastikan telah memakai APD yang sesuai!
                    </Text>


                    {!loading && <MyButton
                        onPress={masuk}
                        title="START"
                        warna={colors.primary}
                        Icons="log-in-outline"
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
        </ImageBackground >
    );
}

const styles = StyleSheet.create({});
