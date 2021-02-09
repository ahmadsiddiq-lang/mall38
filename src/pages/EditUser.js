/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Headers from '../components/Header/Headers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { Picker } from '@react-native-picker/picker';
import { Poppins } from '../assets/fonts';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { getDataUser, updateProfile } from '../redux/actions/User';
import { getIdUser, ToasSuccess, ToasInvalid } from '../config/function';
import FormData from 'form-data';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Clipboard from '@react-native-community/clipboard';


export default function EditUser({ navigation, route }) {
    const dataUser = route.params.data;
    const provinsi_id = dataUser.user.provinsi === null ? dataUser.provinsi[0].provinsi_id : dataUser.user.provinsi.provinsi_id;
    const kabupaten_id = dataUser.user.kabupaten === null ? dataUser.kabupaten[0].kabupaten_id : dataUser.user.kabupaten.kabupaten_id;
    const kecamatan_id = dataUser.user.kecamatan === null ? dataUser.kecamatan[0].kecamatan_id : dataUser.user.kecamatan.kecamatan_id;
    const phoneData = dataUser.user.phone === 'NULL' ? null : dataUser.user.phone;
    const photo = dataUser.user.photo === 'https://mall38.com/images/user/NULL' ? false : dataUser.user.photo;

    const dispatch = useDispatch();

    // const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState(dataUser.user.name);
    const [phone, setPhone] = useState(phoneData);
    const [ktp, setKtp] = useState(dataUser.user.ktp);
    const [kodePos, setKodePos] = useState(dataUser.user.kode_pos);
    const [alamat, setAlamat] = useState(dataUser.user.alamat);
    const [provinsi, setProvinsi] = useState(provinsi_id);
    const [kabupaten, setKabupaten] = useState(kabupaten_id);
    const [kecamatan, setKecamatan] = useState(kecamatan_id);

    const [dataKabupaten, setDataKabupaten] = useState(null);
    const [dataKecamatan, setDataKecamatan] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

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
            ToasSuccess('Update Berhasil');
            setLoading(false);
            dispatch(getDataUser(idUser));
            const x = setTimeout(() => {
                navigation.navigate('MyTabbar');
                return () => {
                    clearTimeout(x);
                };
            }, 2500);
        }
    }, [dispatch, navigation]);

    const inValid = () => {
        ToasInvalid('Update Gagal');
        setLoading(false);
    };

    const handleUpdate = useCallback(async () => {
        const idUser = await getIdUser();
        const data = new FormData();
        data.append('user_id', idUser);
        data.append('photo', image === null ? null : {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
        });
        data.append('nama', name);
        data.append('telp', phone);
        data.append('ktp', ktp);
        data.append('kode_pos', kodePos);
        data.append('alamat', alamat);
        data.append('provinsi_id', provinsi);
        data.append('kabupaten_id', kabupaten);
        data.append('kecamatan_id', kecamatan);

        if (data) {
            setLoading(true);
            dispatch(updateProfile(data, handleUser, inValid));
        }

    }, [name, phone, ktp, alamat, kodePos, provinsi, kecamatan, kabupaten, image, dispatch, handleUser]);

    let options = {
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 0.5,
        cameraType: 'front',
        storageOption: {
            skipBackup: true,
            path: 'images',
        },
        includeBase64: true,
        maxWidth: 300,
        maxHeight: 300,
    };
    const handleCamera = () => {
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            // setModalVisible(!modalVisible);
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            const source = response;
            if (source) {
                setImage(source);
            }
            console.log('Response = ', source);
        });
    };

    const handleLibrary = () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            // setModalVisible(!modalVisible);
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            const source = response;
            if (source) {
                setImage(source);
            }
            console.log('Response = ', source);
        });
    };
    // console.log(dataUser);

    const SalinAccount = () => {
        Clipboard.setString(dataUser.user.refferal_code);
        ToasSuccess('Berhasil disalin');
    };

    useEffect(() => {
        filterData(provinsi);
    }, [filterData, provinsi]);

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Edit Profile'}
            />
            {
                loading &&
                <View style={{
                    position: 'absolute',
                    // backgroundColor: 'black',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 999,
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator size="large" color={color.mainColor} />
                </View>
            }
            <ScrollView>
                <View style={styles.Banner}>
                    <TouchableOpacity
                        onPress={() => handleLibrary()}
                        activeOpacity={0.8}
                        style={styles.BoxImage}>
                        {
                            image === null ?
                                photo ?
                                    <Image
                                        style={styles.Image}
                                        resizeMethod="auto"
                                        source={{ uri: dataUser.user.photo }} />
                                    :
                                    <FontAwesome5 name="user" color={color.fontWhite} size={sizeFont(13)} solid />
                                :
                                <Image
                                    style={styles.Image}
                                    resizeMethod="auto"
                                    source={{ uri: image.uri }} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleLibrary()}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: color.mainColor,
                            width: SCREEN_WIDTH,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            color: color.fontWhite,
                            fontSize: sizeFont(3.5),
                        }}>Tekan untuk ubah</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    marginBottom: sizeHeight(3),
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: sizeWidth(5),
                        paddingVertical: hp(2),
                        borderBottomWidth: 1,
                        borderBottomColor: color.border2,
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>Refferal code</Text>
                        <Text
                            onPress={() => SalinAccount()}
                            style={{
                                fontSize: sizeFont(3.8),
                                fontFamily: Poppins.Medium,
                            }}>{dataUser.user.refferal_code}</Text>
                    </View>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        marginLeft: sizeWidth(5),
                        color: color.fontBlack1,
                        marginTop: hp(1),
                    }}>Nama</Text>
                    <TextInput
                        style={styles.Input}
                        value={name}
                        onChangeText={(e) => setName(e)}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        marginLeft: sizeWidth(5),
                        color: color.fontBlack1,
                        marginTop: hp(1),
                    }}>Nomor telephone / Hp</Text>
                    <TextInput
                        style={styles.Input}
                        value={phone}
                        onChangeText={(e) => setPhone(e)}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        marginLeft: sizeWidth(5),
                        color: color.fontBlack1,
                        marginTop: hp(1),
                    }}>No. KTP</Text>
                    <TextInput
                        style={styles.Input}
                        value={ktp}
                        onChangeText={(e) => setKtp(e)}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        marginLeft: sizeWidth(5),
                        color: color.fontBlack1,
                        marginTop: hp(1),
                    }}>Kode POS</Text>
                    <TextInput
                        style={styles.Input}
                        value={kodePos}
                        onChangeText={(e) => setKodePos(e)}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        marginLeft: sizeWidth(5),
                        color: color.fontBlack1,
                        marginTop: hp(1),
                    }}>Alamat</Text>
                    <TextInput
                        style={styles.Input}
                        value={alamat}
                        onChangeText={(e) => setAlamat(e)}
                    />
                    <View style={styles.BoxDropdown}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontBlack1,
                            marginTop: sizeHeight(2),
                            marginLeft: sizeWidth(2),
                        }}>Provinsi</Text>
                        <Picker
                            mode="dialog"
                            selectedValue={provinsi}
                            style={styles.DropDown}
                            onValueChange={(itemValue, itemIndex) =>
                                handleProv(itemValue)
                            }
                        >
                            {
                                dataUser !== undefined &&
                                dataUser.provinsi.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={item.nama_provinsi} value={item.provinsi_id} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                    <View style={styles.BoxDropdown}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontBlack1,
                            marginTop: sizeHeight(2),
                            marginLeft: sizeWidth(2),
                        }}>Kabupaten</Text>
                        <Picker
                            mode="dialog"
                            selectedValue={kabupaten}
                            style={styles.DropDown}
                            onValueChange={(itemValue, itemIndex) => {
                                setKabupaten(itemValue);
                                handleSetKecamatan(itemValue);
                            }}
                        >
                            {
                                dataKabupaten != null &&
                                dataKabupaten.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={item.nama_kabupaten} value={item.kabupaten_id} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                    <View style={styles.BoxDropdown}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontBlack1,
                            marginTop: sizeHeight(2),
                            marginLeft: sizeWidth(2),
                        }}>Kecamatan</Text>
                        <Picker
                            mode="dialog"
                            selectedValue={kecamatan}
                            style={styles.DropDown}
                            onValueChange={(itemValue, itemIndex) =>
                                setKecamatan(itemValue)
                            }
                        >
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
                <View style={{
                    paddingHorizontal: sizeWidth(5),
                    paddingBottom: sizeHeight(2),
                }}>
                    <TouchableOpacity
                        onPress={() => handleUpdate()}
                        activeOpacity={0.8}
                        style={styles.BtnUpdate}>
                        <Text style={{
                            fontSize: sizeFont(4),
                            color: color.fontWhite,
                            fontFamily: Poppins.Bold,
                        }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    Banner: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: color.mainColor,
    },
    BoxImage: {
        width: sizeWidth(27),
        height: sizeWidth(27),
        borderWidth: 4,
        borderColor: color.border3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: sizeHeight(2),
    },
    Image: {
        width: sizeWidth(27),
        height: sizeWidth(27),
    },
    Input: {
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
        paddingHorizontal: sizeWidth(5),
        fontSize: sizeFont(3.7),
        marginVertical: sizeHeight(0.5),
    },
    DropDown: {
        width: '100%',
    },
    BoxDropdown: {
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
        paddingHorizontal: sizeWidth(3),
    },
    BtnUpdate: {
        backgroundColor: color.mainColor,
        borderRadius: 8,
        paddingVertical: sizeHeight(0.8),
        alignItems: 'center',
    },
    BoxPickImage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        borderWidth: 4,
        borderRadius: 8,
        borderColor: color.mainColor,
        flexDirection: 'row',
        overflow: 'hidden',
        marginTop: sizeHeight(50),
    },
    BoxPickImageItem: {
        overflow: 'hidden',
        width: sizeWidth(25),
        height: sizeWidth(25),
    },
    ImagePick: {
        width: '100%',
        height: '100%',
    },
    BtnCancle: {
        width: sizeWidth(15),
        height: sizeWidth(15),
        backgroundColor: color.mainColor,
        borderRadius: 100,
        marginTop: sizeHeight(3),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
