/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Headers from '../components/Header/Headers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { Picker } from '@react-native-picker/picker';
import { Poppins } from '../assets/fonts';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { getDataUser, updateProfile } from '../redux/actions/User';
import { getIdUser } from '../config/function';
import FormData from 'form-data';
// import Ionicons from 'react-native-vector-icons/Ionicons';


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
            dispatch(getDataUser(idUser));
        }
    }, [dispatch]);

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
            dispatch(updateProfile(data, handleUser));
        }

    }, [name, phone, ktp, alamat, kodePos, provinsi, kecamatan, kabupaten, image, dispatch, handleUser]);

    const options = {
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 0.5,
    };
    const handleCamera = () => {
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response;
                // setModalVisible(!modalVisible);
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setImage(source);
                console.log('Response = ', source);
                alert(source.uri);
            }
        });
    };

    // const handleLibrary = () => {
    //     launchImageLibrary(options, (response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             const source = response;
    //             // setModalVisible(!modalVisible);
    //             // You can also display the image using data:
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //             setImage(source);
    //         }
    //     });
    // };

    useEffect(() => {
        filterData(provinsi);
    }, [filterData, provinsi]);

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Edit Profile'}
            />
            <ScrollView>
                <View style={styles.Banner}>
                    <TouchableOpacity
                        onPress={() => {
                            launchCamera(options, (response) => {
                                setImage(response);
                            });
                        }}
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
                    // marginTop: sizeHeight(3),
                    flex: 1,
                    marginBottom: sizeHeight(3),
                }}>
                    <TextInput
                        style={styles.Input}
                        placeholder="Username"
                        value={name}
                        onChangeText={(e) => setName(e)}
                    />
                    <TextInput
                        style={styles.Input}
                        placeholder="Phone"
                        value={phone}
                        onChangeText={(e) => setPhone(e)}
                    />
                    <TextInput
                        style={styles.Input}
                        placeholder="KTP"
                        value={ktp}
                        onChangeText={(e) => setKtp(e)}
                    />
                    <TextInput
                        style={styles.Input}
                        placeholder="Kode POS"
                        value={kodePos}
                        onChangeText={(e) => setKodePos(e)}
                    />
                    <TextInput
                        style={styles.Input}
                        placeholder="Alamat"
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
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.BoxPickImage}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.BoxPickImageItem}
                            onPress={() => {
                                handleLibrary();
                            }}
                        >
                            <Image style={styles.ImagePick} resizeMethod="auto" source={require('../assets/images/pickImage/imagedefault.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.BoxPickImageItem}
                            onPress={() => {
                                handleCamera();
                            }}
                        >
                            <Image style={styles.ImagePick} resizeMethod="auto" source={require('../assets/images/pickImage/camera.jpg')} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        activeOpacity={0.8}
                        style={styles.BtnCancle}
                    >
                        <Ionicons name="close-circle-outline" size={sizeFont(12)} color={color.fontWhite} />
                    </TouchableOpacity>
                </View>
            </Modal> */}
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
        fontSize: sizeFont(3.5),
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
