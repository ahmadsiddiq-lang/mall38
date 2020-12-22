/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Headers from '../components/Header/Headers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { Picker } from '@react-native-picker/picker';
import { Poppins } from '../assets/fonts';

export default function EditUser({ navigation, route }) {
    const dataUser = route.params.data;

    const [name, setName] = useState(dataUser.user.name);
    const [phone, setPhone] = useState(dataUser.user.phone);
    const [alamat, setAlamat] = useState(dataUser.user.alamat);
    const [provinsi, setProvinsi] = useState(dataUser.user.provinsi.provinsi_id);
    const [kabupaten, setKabupaten] = useState(dataUser.user.kabupaten.kabupaten_id);
    const [kecamatan, setKecamatan] = useState(dataUser.user.kecamatan.kecamatan_id);

    const findKabupaten = () => {
        const data = dataUser.kabupaten.filter(kab => kab.provinsi_id === provinsi);
        // console.log(data);
        return data;
    };

    const findKecamatan = () => {
        const data = dataUser.kecamatan.filter(kab => kab.kabupaten_id === kabupaten);
        // console.log(data);
        return data;
    };

    const handleUpdate = () => {
        const data = {
            name: name,
            phone: phone,
            alamat: alamat,
            provinsi: provinsi,
            kabupaten: kabupaten,
            kecamatan: kecamatan,
        };
        console.log(data);
    };

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Edit Profile'}
            />
            <ScrollView>
                <View style={styles.Banner}>
                    <TouchableOpacity
                        onPress={() => handleUpdate()}
                        activeOpacity={0.8}
                        style={styles.BoxImage}>
                        {
                            dataUser !== undefined &&
                                dataUser.user.photo !== 'https://mall38.com/images/user/NULL' && dataUser.user.photo !== undefined ?
                                <Image
                                    style={styles.Image}
                                    resizeMethod="auto"
                                    source={{ uri: dataUser.user.photo }} />
                                :
                                <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(13)} solid />
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
                        placeholder="Alamat"
                        value={alamat}
                        onChangeText={(e) => setAlamat}
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
                                setProvinsi(itemValue)
                                // console.log(itemValue)
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
                            onValueChange={(itemValue, itemIndex) =>
                                setKabupaten(itemValue)
                            }
                        >
                            {
                                dataUser !== undefined &&
                                findKabupaten().map((item, index) => {
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
                                findKecamatan().map((item, index) => {
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
});
