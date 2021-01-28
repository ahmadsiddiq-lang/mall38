/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { SCREEN_HEIGHT, SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAdmin, LoginUser } from '../redux/actions/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataUser } from '../redux/actions/User';
import { getCArt } from '../redux/actions/Cart';
import { ToasInvalid, ToasSuccess, validateEmail, validatePassword } from '../config/function';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { getOtpForgote, resendOTP } from '../redux/actions/Register';

export default function Login({ navigation }) {

    const dispatch = useDispatch();
    const [focus, setFocus] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [eye, setEye] = useState(true);
    const [modalEmail, setModalEmail] = useState(false);
    const [emailAkun, setEmailAkun] = useState(null);
    const [idModal, setIdModal] = useState(null);


    // const dataUser = useSelector(state => state.dataLogin.dataUser);
    const dataAdmin = useSelector(state => state.dataLogin.dataAdmin);

    const handleErrorLogin = useCallback(async () => {
        ToastAndroid.showWithGravity('Email atau Password Anda salah', ToastAndroid.LONG, ToastAndroid.CENTER);
    }, []);

    const handleLoginSuccess = useCallback(async (idUser) => {
        try {
            const id = JSON.stringify(idUser.id);
            dispatch(getDataUser(id));
            dispatch(getCArt(id));
            await AsyncStorage.setItem('idUser', id);
            navigation.replace('MyTabbar');
        } catch (e) {
            // saving error
            console.log(e);
        }
    }, [navigation, dispatch]);

    const handleLogin = useCallback(async () => {
        const value = await AsyncStorage.getItem('token');
        const data = {
            email: email,
            password: password,
        };
        if (value != null) {
            if (validateEmail(email)) {
                // if (validatePassword(password)) {
                if (password !== null) {
                    dispatch(LoginUser(data, handleErrorLogin, handleLoginSuccess));
                } else {
                    ToastAndroid.showWithGravity('Periksa kembali password', ToastAndroid.LONG, ToastAndroid.CENTER);
                }
            } else {
                ToastAndroid.showWithGravity('Format email salah !', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        }
    }, [dispatch, email, password, handleErrorLogin, handleLoginSuccess]);

    const handleLoginAdmin = useCallback(async () => {
        const data = {
            email: 'info@mall38.com',
            password: 'mall38diloka',
        };
        dispatch(LoginAdmin(data, storeData));
    }, [dispatch, storeData]);

    // console.log(dataAdmin);
    const storeData = useCallback(async (value) => {
        const token = value.token;
        try {
            await AsyncStorage.setItem('token', token);
        } catch (e) {
            // saving error
            console.log(e);
        }
    }, []);

    const resendSuccess = useCallback(() => {
        setModalEmail(!modalEmail);
        ToasSuccess('Success !');
        const x = setTimeout(() => {
            if (idModal === 0) {
                navigation.navigate('ForgotePassword', {
                    email: emailAkun,
                });
            } else {
                navigation.navigate('SetOTP', {
                    email: emailAkun,
                });
            }
            return () => {
                clearTimeout(x);
            };
        }, 500);
    }, [modalEmail, navigation, emailAkun, idModal]);

    const resendError = useCallback(() => {
        ToastAndroid.showWithGravity('Email tidak ditemukan',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }, []);

    const handleActiveAkun = useCallback(() => {
        console.log(emailAkun);
        if (validateEmail(emailAkun)) {
            if (idModal === 0) {
                console.log('forgote');
                dispatch(getOtpForgote(emailAkun, resendSuccess, resendError));
            } else {
                console.log('resend OTP');
                dispatch(resendOTP(emailAkun, resendSuccess, resendError));
            }
        } else {
            ToastAndroid.showWithGravity('Email tidak valid',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }, [emailAkun, dispatch, resendSuccess, resendError, idModal]);

    useEffect(() => {
        handleLoginAdmin();
    }, [dataAdmin, handleLoginAdmin]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.bgWhite} barStyle="dark-content" />
            <ScrollView>
                <View style={{
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                    <View style={styles.BackgroundWhite}>
                        <View style={styles.Content}>
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
                            <View style={styles.BoxContentInput}>
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                    <View style={styles.BoxIconUser}>
                                        <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(12)} solid />
                                    </View>
                                </View>
                                <View style={[styles.BoxInput,
                                focus === 0 &&
                                {
                                    borderWidth: 1,
                                    borderColor: color.mainColor,
                                },
                                ]}>
                                    <FontAwesome5 name="at" color={color.mainColor} size={sizeFont(5)} solid />
                                    <TextInput
                                        keyboardType="email-address"
                                        onChangeText={(e) => setEmail(e)}
                                        onFocus={() => setFocus(0)}
                                        onBlur={() => setFocus(null)}
                                        placeholder="Email"
                                        style={styles.Input}
                                        autoCapitalize="none"
                                    />
                                </View>
                                <View style={[styles.BoxInput,
                                focus === 1 &&
                                {
                                    borderWidth: 1,
                                    borderColor: color.mainColor,
                                },
                                ]}>
                                    <FontAwesome5 name="key" color={color.mainColor} size={sizeFont(5)} solid />
                                    <TextInput
                                        onChangeText={(e) => setPassword(e)}
                                        secureTextEntry={eye}
                                        onBlur={() => setFocus(null)}
                                        onFocus={() => setFocus(1)}
                                        style={styles.Input}
                                        placeholder="Password"
                                        onSubmitEditing={() => handleLogin()}
                                    />
                                    <FontAwesome5 onPress={() => setEye(!eye)} name={eye ? 'eye-slash' : 'eye'} color={color.mainColor} size={sizeFont(4)} solid />
                                </View>
                            </View>
                            <View style={styles.BoxContentLogin}>
                                <TouchableOpacity
                                    onPress={() => handleLogin()}
                                    activeOpacity={0.8}
                                    style={styles.BtnLogin}
                                >
                                    <Text style={{
                                        fontSize: sizeFont(4.5),
                                        color: color.fontWhite,
                                        fontFamily: Poppins.Bold,
                                        textAlign: 'center',
                                    }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.BoxRegister}>
                    <Text
                        onPress={() => {
                            setIdModal(0);
                            setModalEmail(!modalEmail);
                        }}
                        style={{
                            fontSize: sizeFont(4),
                            color: color.fontWhite,
                            marginTop: sizeHeight(2),
                            fontFamily: Poppins.Italic,
                            marginRight: sizeWidth(3),
                        }}>Forgot password ?</Text>
                    <Text
                        onPress={() => {
                            setIdModal(1);
                            setModalEmail(!modalEmail);
                        }}
                        style={{
                            fontSize: sizeFont(4),
                            color: color.fontWhite,
                            marginTop: sizeHeight(2),
                            fontFamily: Poppins.Italic,
                            marginRight: sizeWidth(3),
                        }}>Activasi Akun ?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                        activeOpacity={0.8}
                        style={styles.BtnRegister}
                    >
                        <Text style={{
                            fontSize: sizeFont(4),
                            color: color.mainColor,
                            fontFamily: Poppins.Bold,
                        }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEmail}
                onRequestClose={() => {
                    //   Alert.alert("Modal has been closed.");
                    setModalEmail(!modalEmail);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: sizeWidth(5),
                }}>
                    <TouchableOpacity
                        onPress={() => setModalEmail(!modalEmail)}
                        activeOpacity={0.8}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        }}
                    />
                    <View style={{
                        backgroundColor: color.bgWhite,
                        borderRadius: 8,
                        paddingHorizontal: sizeWidth(5),
                        paddingVertical: hp(2),
                    }}>
                        {
                            idModal === 0 ?
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                }}>Forgote Password</Text>
                                :
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                }}>Activasi Akun</Text>
                        }
                        <View style={styles.BoxInput}>
                            <TextInput
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(e) => setEmailAkun(e)}
                                placeholder="Masukkan email"
                                style={{
                                    fontFamily: Poppins.Regular,
                                    flex: 1,
                                }}
                            />
                        </View>
                        <View style={{
                            alignItems: 'flex-end',
                        }}>
                            <TouchableOpacity
                                onPress={() => handleActiveAkun()}
                                activeOpacity={0.8}
                                style={[styles.BtnLogin, { alignItems: 'center' }]}
                            >
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                    color: color.fontWhite,
                                    textAlign: 'center',
                                    fontFamily: Poppins.Medium,
                                }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.mainColor,
    },
    BackgroundWhite: {
        height: hp(70),
        // height: 550,
        backgroundColor: color.bgWhite,
        borderBottomLeftRadius: sizeWidth(200) / 2,
        borderBottomRightRadius: sizeWidth(200) / 2,
        width: sizeWidth(200),
        alignItems: 'center',
    },
    Content: {
        // borderWidth: 1,
        width: SCREEN_WIDTH,
        flex: 1,
        alignItems: 'center',
    },
    BoxImage: {
        width: sizeWidth(60),
        height: sizeWidth(30),
    },
    BoxContentInput: {
        borderWidth: 3,
        borderColor: color.mainColor,
        borderRadius: 8,
        width: sizeWidth(80),
        padding: sizeHeight(3),
        marginTop: sizeHeight(8),
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
        fontFamily: Poppins.Regular,
    },
    BoxIconUser: {
        borderWidth: 3,
        borderColor: color.mainColor,
        position: 'absolute',
        top: -95,
        borderRadius: 100,
        width: sizeWidth(25),
        height: sizeWidth(25),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.bgWhite,
    },
    BoxContentLogin: {
        marginTop: sizeHeight(5),
    },
    BtnLogin: {
        backgroundColor: color.mainColor,
        width: sizeWidth(40),
        paddingVertical: sizeHeight(0.5),
        borderRadius: 8,
        alignItems: 'center',
    },
    BoxRegister: {
        // borderWidth: 1,
        alignItems: 'flex-end',
    },
    BtnRegister: {
        backgroundColor: color.bgWhite,
        marginTop: sizeHeight(2),
        width: sizeWidth(28),
        paddingVertical: sizeHeight(0.5),
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        paddingLeft: sizeWidth(5),
    },
});
