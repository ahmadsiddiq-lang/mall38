/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import HeaderRegister from '../components/Header/HeaderRegister';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Poppins } from '../assets/fonts';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/Register';
import { ToasInvalid, ToasSuccess, validate, validateEmail, validatePassword } from '../config/function';

export default function Register({ navigation }) {

    const dispatch = useDispatch();

    const [focus, setFocus] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [eye, setEye] = useState(true);


    const handleReponsSucces = useCallback(async () => {
        ToasSuccess('Register Success');
        setTimeout(() => {
            navigation.goBack();
        }, 1000);
    }, [navigation]);


    const handleRegister = useCallback(async () => {
        const data = {
            name: username,
            email: email,
            password: password,
        };
        if (validateEmail(email)) {
            if (validatePassword(password)) {
                if (password !== null && username !== null) {
                    if (password.length >= 6) {
                        dispatch(registerUser(data, handleReponsSucces));
                    } else {
                        ToasInvalid('Password kurang dari 6');
                    }
                } else {
                    console.log(data);
                    ToasInvalid('Lengkapi data Anda');
                }
            } else {
                ToastAndroid.showWithGravity('Password 8 karakter dengan huruf besar, kecil dan angka', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        } else {
            ToastAndroid.showWithGravity('Format email salah !', ToastAndroid.LONG, ToastAndroid.CENTER);
        }
    }, [email, password, username, dispatch, handleReponsSucces]);


    return (
        <View style={styles.Container}>
            <HeaderRegister navigation={navigation} title="Register" />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    alignItems: 'center',
                }}>
                    <View style={styles.BoxImage}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMethod="auto"
                            source={require('../assets/images/logo/logo.png')} />
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    flex: 1,
                }}>
                    <View style={styles.BoxContentInput}>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <View style={styles.BoxIconUser}>
                                <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(12)} solid />
                            </View>
                        </View>
                        <View style={[styles.BoxInput,
                        focus === 2 &&
                        {
                            borderWidth: 3,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(5)} solid />
                            <TextInput
                                maxLength={30}
                                onChangeText={(e) => setUsername(e)}
                                onBlur={() => setFocus(null)}
                                onFocus={() => setFocus(2)}
                                style={styles.Input}
                                placeholder="Username"
                            />
                        </View>
                        <View style={[styles.BoxInput,
                        focus === 0 &&
                        {
                            borderWidth: 3,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="at" color={color.mainColor} size={sizeFont(5)} solid />
                            <TextInput
                                maxLength={30}
                                onChangeText={(e) => setEmail(e)}
                                onFocus={() => setFocus(0)}
                                onBlur={() => setFocus(null)}
                                placeholder="Email"
                                style={styles.Input}
                                keyboardType="email-address"
                            />
                        </View>
                        <View style={[styles.BoxInput,
                        focus === 1 &&
                        {
                            borderWidth: 3,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="key" color={color.mainColor} size={sizeFont(5)} solid />
                            <TextInput
                                maxLength={20}
                                onChangeText={(e) => setPassword(e)}
                                secureTextEntry={eye}
                                onBlur={() => setFocus(null)}
                                onFocus={() => setFocus(1)}
                                style={styles.Input}
                                placeholder="Password"
                            />
                            <FontAwesome5 onPress={() => setEye(!eye)} name={eye ? 'eye-slash' : 'eye'} color={color.mainColor} size={sizeFont(4)} solid />
                        </View>
                        <Text style={{
                            fontSize: sizeFont(2.6),
                            color: color.fontBlack2,
                        }}>Password 8 karakter dengan huruf besar, kecil dan angka</Text>
                    </View>
                    <View style={styles.BoxContentLogin}>
                        <TouchableOpacity
                            onPress={() => handleRegister()}
                            activeOpacity={0.8}
                            style={styles.BtnLogin}
                        >
                            <Text style={{
                                fontSize: sizeFont(4.5),
                                color: color.fontWhite,
                                fontFamily: Poppins.Bold,
                                flex: 1,
                                textAlign: 'center',
                            }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
        alignItems: 'center',
    },
    BoxImage: {
        width: sizeWidth(60),
        height: sizeWidth(30),
        alignItems: 'center',
    },
    BoxContentInput: {
        borderWidth: 3,
        borderColor: color.mainColor,
        borderRadius: 8,
        width: sizeWidth(80),
        padding: sizeHeight(3),
        // marginTop: sizeHeight(1),
    },
    BoxInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: sizeHeight(1),
        borderColor: color.border2,
        borderRadius: 8,
        marginVertical: sizeHeight(2),
    },
    Input: {
        // borderWidth: 1,
        marginLeft: sizeWidth(2),
        flex: 1,
        fontSize: sizeFont(4),
    },
    BoxContentLogin: {
        marginTop: sizeHeight(5),
        alignItems: 'flex-end',
    },
    BtnLogin: {
        backgroundColor: color.mainColor,
        width: sizeWidth(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: sizeHeight(0.5),
        borderRadius: 8,
        alignItems: 'center',
    },
});
