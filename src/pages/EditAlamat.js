/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Headers from '../components/Header/Headers';
import { Picker } from '@react-native-picker/picker';
import { Poppins } from '../assets/fonts';
import { getIdUser, ToasInvalid } from '../config/function';
import { useDispatch } from 'react-redux';
import { getDataUser, updateProfile } from '../redux/actions/User';
import { getOngkir } from '../redux/actions/getOngkir';

export default function EditAlamat({ navigation, route }) {

    const dataUser = route.params.dataUser;
    const beratProduk = route.params.beratProduk;
    const dispatch = useDispatch();

    const provinsi_id = dataUser.user.provinsi === null ? dataUser.provinsi[0].provinsi_id : dataUser.user.provinsi.provinsi_id;
    const kabupaten_id = dataUser.user.kabupaten === null ? dataUser.kabupaten[0].kabupaten_id : dataUser.user.kabupaten.kabupaten_id;
    const kecamatan_id = dataUser.user.kecamatan === null ? dataUser.kecamatan[0].kecamatan_id : dataUser.user.kecamatan.kecamatan_id;
    const phoneData = dataUser.user.phone === 'NULL' ? null : dataUser.user.phone;

    // console.log(beratProduk);

    const name = dataUser.user.name;
    const ktp = dataUser.user.ktp;
    const kodePos = dataUser.user.kode_pos;
    const [telpon, setTelpon] = useState(phoneData);
    const [alamat, setAlamat] = useState(dataUser.user.alamat);
    const [provinsi, setProvinsi] = useState(provinsi_id);
    const [kabupaten, setKabupaten] = useState(kabupaten_id);
    const [kecamatan, setKecamatan] = useState(kecamatan_id);

    const [dataKabupaten, setDataKabupaten] = useState(null);
    const [dataKecamatan, setDataKecamatan] = useState(null);


    const getOngkirs = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            const data = new FormData();
            data.append('user_id', idUser);
            data.append('weight', beratProduk);
            dispatch(getOngkir(data));
        }
    }, [dispatch, beratProduk]);

    const filterData = useCallback((idProv) => {
        const dataKab = dataUser.kabupaten.filter(item => item.provinsi_id === idProv);
        const dataKec = dataUser.kecamatan.filter(item => item.kabupaten_id === kabupaten);
        setDataKabupaten(dataKab);
        setDataKecamatan(dataKec);
    }, [dataUser, kabupaten]);

    const handleSetKecamatan = useCallback((idKab) => {
        const dataKec = dataUser.kecamatan.filter(item => item.kabupaten_id === idKab);
        setDataKecamatan(dataKec);
        setKecamatan(dataKec[0].kecamatan_id);
    }, [dataUser]);

    const handleSetKabupaten = useCallback((idProv) => {
        const dataKab = dataUser.kabupaten.filter(item => item.provinsi_id === idProv);
        setDataKabupaten(dataKab);
        setKabupaten(dataKab[0].kabupaten_id);
        handleSetKecamatan(dataKab[0].kabupaten_id);
    }, [dataUser, handleSetKecamatan]);

    const handleProv = useCallback((idProv) => {
        setProvinsi(idProv);
        handleSetKabupaten(idProv);
    }, [handleSetKabupaten]);

    const handleUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            getOngkirs();
            dispatch(getDataUser(idUser));
            const x = setTimeout(() => {
                navigation.navigate('CheckOut');
                return () => {
                    clearTimeout(x);
                };
            }, 1200);
        }
    }, [dispatch, getOngkirs, navigation]);

    const handleUpdate = useCallback(async () => {
        const idUser = await getIdUser();
        const data = new FormData();
        data.append('user_id', idUser);
        data.append('photo', null);
        data.append('nama', name);
        data.append('telp', telpon);
        data.append('ktp', ktp);
        data.append('kode_pos', kodePos);
        data.append('alamat', alamat);
        data.append('provinsi_id', provinsi);
        data.append('kabupaten_id', kabupaten);
        data.append('kecamatan_id', kecamatan);

        if (data && telpon != null && alamat != null) {
            dispatch(updateProfile(data, handleUser));
        } else {
            ToasInvalid('Isi data dengan benar !');
        }
        // console.log(data);

    }, [name, telpon, ktp, alamat, kodePos, provinsi, kecamatan, kabupaten, dispatch, handleUser]);

    useEffect(() => {
        filterData(provinsi);
    }, [filterData, provinsi]);


    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={'Edit Alamat'} />
            <ScrollView>
                <View style={styles.Content}>
                    <View style={styles.BoxList}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>Nomor Telephone / HP</Text>
                        <TextInput
                            keyboardType="phone-pad"
                            onChangeText={(e) => setTelpon(e)}
                            value={telpon}
                            placeholder="Nomor Telepon"
                            style={styles.Input}
                        />
                    </View>
                    <View style={styles.BoxList}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>ALamat</Text>
                        <TextInput
                            onChangeText={(e) => setAlamat(e)}
                            value={alamat}
                            placeholder="Alamat"
                            style={styles.Input}
                        />
                    </View>
                    <View style={styles.BoxList}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>Provinsi</Text>
                        <Picker
                            mode="dialog"
                            selectedValue={provinsi}
                            style={{ width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                handleProv(itemValue)
                            }>
                            {
                                dataUser.provinsi.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={item.nama_provinsi} value={item.provinsi_id} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                    <View style={styles.BoxList}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>Kabupaten</Text>
                        <Picker
                            mode="dialog"
                            selectedValue={kabupaten}
                            style={{ width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => {
                                setKabupaten(itemValue);
                                handleSetKecamatan(itemValue);
                            }}>
                            {dataKabupaten != null &&
                                dataKabupaten.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={item.nama_kabupaten} value={item.kabupaten_id} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                    <View style={styles.BoxList}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>Kecamatan</Text>
                        <Picker
                            mode="dialog"
                            selectedValue={kecamatan}
                            style={{ width: '100%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                setKecamatan(itemValue)
                            }>
                            {
                                dataKecamatan != null &&
                                dataKecamatan.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={item.nama_kecamatan} value={item.kecamatan_id} />
                                    );
                                })
                            }
                        </Picker>
                    </View>

                </View>
            </ScrollView>
            <View style={{
                paddingHorizontal: sizeWidth(5),
                paddingBottom: sizeHeight(2),
            }}>
                <TouchableOpacity
                    onPress={() => handleUpdate(kabupaten)}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: color.mainColor,
                        borderRadius: 8,
                        paddingVertical: sizeHeight(0.8),
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        color: color.fontWhite,
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                    }}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    Content: {
        marginTop: sizeHeight(3),
    },
    BoxList: {
        paddingHorizontal: sizeWidth(5),
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
        marginBottom: sizeHeight(2),
    },
    Input: {

    },
});
