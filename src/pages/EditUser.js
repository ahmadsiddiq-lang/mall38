/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Headers from '../components/Header/Headers';
import { color } from '../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { Picker } from '@react-native-picker/picker';
import { Poppins } from '../assets/fonts';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { getDataUser, updateProfile } from '../redux/actions/User';
import { getIdUser, ToasSuccess, ToasInvalid } from '../config/function';
import FormData from 'form-data';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Clipboard from '@react-native-community/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    // const handleCamera = () => {
    //     launchCamera(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //             return;
    //         }
    //         // setModalVisible(!modalVisible);
    //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //         const source = response;
    //         if (source) {
    //             setImage(source);
    //         }
    //         console.log('Response = ', source);
    //     });
    // };

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
            <View style={styles.Banner}>
                <ImageBackground
                    resizeMethod="resize"
                    source={require('../assets/images/background/Background.png')}
                    style={{
                        width: SCREEN_WIDTH,
                        height: hp(20),
                    }}
                >
                    <View style={{
                        backgroundColor: color.mainColor,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: hp(4),
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.goBack()}
                            style={{
                                paddingVertical: sizeWidth(3.5),
                                paddingLeft: sizeWidth(5),
                            }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={sizeFont(6.5)}
                                color={color.fontWhite}
                            />
                        </TouchableOpacity>
                        <Text style={{
                            marginLeft: sizeWidth(5),
                            fontSize: sizeFont(4.5),
                            color: color.fontWhite,
                            fontFamily: Poppins.Medium,
                        }}>Edit Profile</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{
                alignItems: 'center',
                width: SCREEN_WIDTH,
                position: 'absolute',
                marginTop: hp(10),
                zIndex: 999,
            }}>
                <TouchableOpacity
                    onPress={() => handleLibrary()}
                    activeOpacity={1}
                    style={styles.BoxImage}>
                    {
                        image === null ?
                            photo ?
                                <Image
                                    style={styles.Image}
                                    resizeMethod="auto"
                                    source={{ uri: dataUser.user.photo }} />
                                :
                                <Image
                                    style={styles.Image}
                                    resizeMethod="auto"
                                    source={{ uri: `https://ui-avatars.com/api/?name=${dataUser.user.name}/background=0D8ABC&color=fff` }} />
                            :
                            <Image
                                style={styles.Image}
                                resizeMethod="auto"
                                source={{ uri: image.uri }} />
                    }
                    <Image
                        source={require('../assets/images/pageAkun/IconEditFoto.png')}
                        style={{
                            resizeMode: 'contain',
                            width: sizeWidth(6),
                            height: sizeWidth(6),
                            position: 'absolute',
                            right: 5,
                            bottom: 8,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <TouchableOpacity
                        onPress={() => SalinAccount()}
                        activeOpacity={0.8}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomColor: color.border2,
                            marginTop: hp(5),
                            backgroundColor: '#EADEF4',
                            paddingVertical: hp(1),
                            borderRadius: 5,
                            paddingHorizontal: sizeWidth(5),
                            marginBottom: hp(2),
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image
                                source={require('../assets/images/pageAkun/IconRefferal.png')}
                                style={{
                                    resizeMode: 'contain',
                                    width: sizeWidth(5),
                                    height: sizeWidth(5),
                                }}
                            />
                            <Text style={{
                                fontSize: sizeFont(3.5),
                                marginLeft: sizeWidth(2),
                            }}>Refferal code</Text>
                        </View>
                        <Text style={{
                            fontSize: sizeFont(3.8),
                            fontFamily: Poppins.Medium,
                        }}>{dataUser.user.refferal_code}</Text>
                    </TouchableOpacity>
                    <View style={styles.BoxInput}>
                        <Text style={styles.titleInput}>Nama</Text>
                        <TextInput
                            maxLength={16}
                            style={styles.Input}
                            value={name}
                            onChangeText={(e) => setName(e)}
                        />
                    </View>
                    <View style={styles.BoxInput}>
                        <Text style={styles.titleInput}>Nomor telephone / Hp</Text>
                        <TextInput
                            keyboardType="phone-pad"
                            maxLength={15}
                            style={styles.Input}
                            value={phone !== 'null' ? phone : null}
                            onChangeText={(e) => setPhone(e)}
                        />
                    </View>
                    <View style={styles.BoxInput}>
                        <Text style={styles.titleInput}>No. KTP</Text>
                        <TextInput
                            keyboardType="number-pad"
                            maxLength={16}
                            style={styles.Input}
                            value={ktp !== 'null' ? ktp : null}
                            onChangeText={(e) => setKtp(e)}
                        />
                    </View>
                    <View style={styles.BoxInput}>
                        <Text style={styles.titleInput}>Kode POS</Text>
                        <TextInput
                            keyboardType="number-pad"
                            maxLength={5}
                            style={styles.Input}
                            value={kodePos !== 'null' ? kodePos : null}
                            onChangeText={(e) => setKodePos(e)}
                        />
                    </View>
                    <View style={styles.BoxInput}>
                        <Text style={styles.titleInput}>Alamat</Text>
                        <TextInput
                            multiline={true}
                            style={styles.Input}
                            value={alamat !== 'null' ? alamat : null}
                            onChangeText={(e) => setAlamat(e)}
                        />
                    </View>
                    <View style={styles.BoxDropdown}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontBlack1,
                            marginTop: sizeHeight(2),
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
                    <View style={{
                        paddingHorizontal: sizeWidth(5),
                        paddingBottom: sizeHeight(2),
                        marginTop: hp(5),
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
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.mainColor,
    },
    Banner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.mainColor,
    },
    BoxImage: {
        width: sizeWidth(25),
        height: sizeWidth(25),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: sizeWidth(25),
        marginTop: hp(1.8),
    },
    Image: {
        width: sizeWidth(25),
        height: sizeWidth(25),
        borderRadius: sizeWidth(25),
    },
    content: {
        flex: 1,
        backgroundColor: color.bgWhite,
        borderTopLeftRadius: 50,
        paddingTop: hp(4),
        paddingHorizontal: sizeWidth(5),
    },
    BoxInput: {
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
    },
    titleInput: {
        fontSize: sizeFont(3.3),
        color: color.fontBlack1,
        marginTop: hp(2),
        flex: 1,
    },
    Input: {
        fontSize: sizeFont(3.7),
        marginVertical: sizeHeight(0.5),
        flex: 2,
        padding: 0,
    },
    DropDown: {
        width: '100%',
    },
    BoxDropdown: {
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
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
