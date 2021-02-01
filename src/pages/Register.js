/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import HeaderRegister from '../components/Header/HeaderRegister';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Poppins } from '../assets/fonts';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/Register';
import { ToasInvalid, ToasSuccess, validateEmail, validatePassword } from '../config/function';
import { getDataUser } from '../redux/actions/User';
import { getCArt } from '../redux/actions/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';

export default function Register({ navigation }) {

    const dispatch = useDispatch();

    const [focus, setFocus] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [fullname, setFullName] = useState(null);
    const [kodeReferral, setKodeReferral] = useState(null);
    const [eye, setEye] = useState(true);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);


    const handleReponsSucces = useCallback(async (idUser) => {
        ToasSuccess('Register Success');
        try {
            const id = JSON.stringify(idUser.id);
            dispatch(getDataUser(id));
            dispatch(getCArt(id));
            await AsyncStorage.setItem('idUser', id);
            setTimeout(() => {
                navigation.replace('SetOTP', {
                    email: email,
                });
            }, 1000);
        } catch (e) {
            // saving error
            console.log(e);
        }
    }, [navigation, dispatch, email]);

    const handleRequesError = (err) => {
        const error = err.data;
        console.log(error);
        if (error.message === 'Refferal code tidak ditemukan') {
            ToasInvalid(error.message);
        } else if (error.errors.username !== undefined) {
            ToasInvalid('Username sudah ada');
            // ToasInvalid(error.message);
        } else if (error.errors.email !== undefined) {
            ToasInvalid('Email sudah ada');
            // ToasInvalid(error.message);
        }
    };


    const handleRegister = useCallback(async () => {
        const data = {
            name: fullname,
            username: username,
            email: email,
            password: password,
            refferal_code: kodeReferral,
        };
        if (password !== null && username !== null && fullname !== null) {
            if (validateEmail(email)) {
                if (validatePassword(password)) {
                    if (username.length >= 6) {
                        if (password.length >= 6) {
                            if (toggleCheckBox) {
                                dispatch(registerUser(data, handleReponsSucces, handleRequesError));
                            } else {
                                ToastAndroid.showWithGravity('Setujui syarat & ketentuan', ToastAndroid.LONG, ToastAndroid.CENTER);
                            }
                        } else {
                            ToasInvalid('Password kurang dari 6');
                        }
                    } else {
                        ToastAndroid.showWithGravity('Username kurang dari 6 karakter', ToastAndroid.LONG, ToastAndroid.CENTER);
                    }
                } else {
                    ToastAndroid.showWithGravity('Password 8 karakter dengan huruf besar, kecil dan angka', ToastAndroid.LONG, ToastAndroid.CENTER);
                }
            } else {
                ToastAndroid.showWithGravity('Format email salah !', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        } else {
            console.log(data);
            ToasInvalid('Lengkapi data Anda');
        }
    }, [email, password, username, dispatch, handleReponsSucces, fullname, kodeReferral, toggleCheckBox]);


    return (
        <View style={styles.Container}>
            <View style={{
                width: SCREEN_WIDTH,
                height: hp(15),
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image
                    resizeMethod="resize"
                    source={require('../assets/images/Login/BG_Login.png')}
                    style={{
                        resizeMode: 'stretch',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 1,
                    }}
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                    style={{
                        paddingLeft: sizeWidth(5),
                        paddingVertical: sizeHeight(1),
                        paddingRight: sizeWidth(3),
                        zIndex: 2,
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        color={color.fontWhite}
                        size={sizeFont(6.5)}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: sizeFont(4.5),
                    fontFamily: Poppins.Medium,
                    color: color.fontWhite,
                    zIndex: 2,
                }}>Register</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <View style={styles.BoxContentInput}>
                        <View style={[styles.BoxInput,
                        focus === 3 &&
                        {
                            borderWidth: 0.5,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(4.5)} solid />
                            <TextInput
                                maxLength={30}
                                onChangeText={(e) => setFullName(e)}
                                onBlur={() => setFocus(null)}
                                onFocus={() => setFocus(3)}
                                style={styles.Input}
                                placeholder="Full Name"
                            />
                        </View>
                        <View style={[styles.BoxInput,
                        focus === 2 &&
                        {
                            borderWidth: 0.5,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(4.5)} solid />
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
                            borderWidth: 0.5,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="envelope" color={color.mainColor} size={sizeFont(4.5)} solid />
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
                            borderWidth: 0.5,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="unlock-alt" color={color.mainColor} size={sizeFont(4.5)} solid />
                            <TextInput
                                maxLength={20}
                                onChangeText={(e) => setPassword(e)}
                                secureTextEntry={eye}
                                onBlur={() => setFocus(null)}
                                onFocus={() => setFocus(1)}
                                style={styles.Input}
                                placeholder="Password"
                            />
                            <FontAwesome5 onPress={() => setEye(!eye)} name={eye ? 'eye-slash' : 'eye'} color={color.mainColor} size={sizeFont(3)} solid />
                        </View>
                        <Text style={{
                            fontSize: sizeFont(2.6),
                            color: color.fontBlack2,
                            marginLeft: sizeWidth(2),
                            marginTop: -10,
                        }}>* Password 8 karakter dengan huruf besar, kecil dan angka</Text>
                        <View style={[styles.BoxInput,
                        focus === 4 &&
                        {
                            borderWidth: 0.5,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="users" color={color.mainColor} size={sizeFont(4.5)} solid />
                            <TextInput
                                maxLength={30}
                                onChangeText={(e) => setKodeReferral(e)}
                                onBlur={() => setFocus(null)}
                                onFocus={() => setFocus(4)}
                                style={styles.Input}
                                placeholder="Kode Referal"
                            />
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: sizeWidth(5),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <CheckBox
                            tintColors={{ true: color.mainColor, false: color.mainColor1 }}
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={{
                            fontSize: sizeFont(3),
                            marginLeft: sizeWidth(2),
                            color: color.mainColor,
                        }}>Saya menyetujui syarat & ketentuan yang berlaku</Text>
                    </View>
                    <View style={styles.BoxContentLogin}>
                        <TouchableOpacity
                            onPress={() =>
                                handleRegister()
                            }
                            activeOpacity={0.8}
                            style={styles.BtnLogin}
                        >
                            <Text style={{
                                fontSize: sizeFont(4.5),
                                color: color.fontWhite,
                                fontFamily: Poppins.Bold,
                                textAlign: 'center',
                            }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: sizeFont(3.3),
                        marginTop: hp(2),
                        marginRight: sizeWidth(3),
                    }}>Sudah mempunyai akun ?
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={{
                                color: color.mainColor,
                                fontFamily: Poppins.Medium,
                            }}
                        > Login</Text>
                    </Text>
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
    BoxImage: {
        width: sizeWidth(60),
        height: sizeWidth(30),
        alignItems: 'center',
    },
    BoxContentInput: {
        paddingHorizontal: sizeWidth(5),
        marginTop: sizeHeight(2),
    },
    BoxInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        paddingHorizontal: sizeHeight(2),
        borderColor: color.border2,
        borderRadius: 30,
        marginVertical: sizeHeight(2),
        elevation: 3,
        backgroundColor: color.bgWhite,
    },
    Input: {
        // borderWidth: 1,
        marginLeft: sizeWidth(2),
        flex: 1,
        fontSize: sizeFont(3.5),
        fontFamily: Poppins.Regular,
    },
    BoxContentLogin: {
        marginTop: hp(2),
        alignItems: 'center',
    },
    BtnLogin: {
        backgroundColor: color.mainColor,
        width: sizeWidth(40),
        paddingVertical: sizeHeight(0.5),
        borderRadius: 30,
        alignItems: 'center',
        elevation: 5,
    },
});
