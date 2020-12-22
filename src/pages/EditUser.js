/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Headers from '../components/Header/Headers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';

export default function EditUser({ navigation, route }) {
    const dataUser = route.params.data;
    console.log(dataUser);

    const [nama, setnama] = useState(dataUser.nama);

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Edit Profile'}
                backgroundColor={color.bgWhite}
                colorBtnBack={color.mainColor}
                textColo={color.mainColor}
            />
            <View style={styles.Banner}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.BoxImage}>
                    {
                        dataUser.photo !== 'https://mall38.com/images/user/NULL' && dataUser.photo !== undefined ?
                            <Image
                                style={styles.Image}
                                resizeMethod="auto"
                                source={{ uri: dataUser.photo }} />
                            :
                            <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(13)} solid />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: color.mainColor,
                        width: SCREEN_WIDTH,
                        marginTop: sizeHeight(3),
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
                marginTop: sizeHeight(3),
            }}>
                <TextInput style={styles.Input} placeholder="Username" value={nama} />
                <TextInput style={styles.Input} placeholder="Phone" value={nama} />
                <TextInput style={styles.Input} placeholder="Email" value={nama} />
            </View>
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
    },
    BoxImage: {
        width: sizeWidth(27),
        height: sizeWidth(27),
        borderWidth: 4,
        borderColor: color.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: sizeHeight(3),
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
        marginVertical: sizeHeight(1),
    },
});
