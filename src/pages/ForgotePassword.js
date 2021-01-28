/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { ToasInvalid, ToasSuccess, validateEmail, validatePassword } from '../config/function';
import { getOtpForgote } from '../redux/actions/Register';
import { forgotePassword } from '../redux/actions/User';

export default function ForgotePassword({ navigation, route }) {

    const [onFocus, setOnfocus] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordTwo, setPasswordTuo] = useState(null);
    const [kode, setKode] = useState(null);

    const dispatch = useDispatch();

    const handleSuccess = useCallback(() => {
        ToasSuccess('Success');
        const x = setTimeout(() => {
            navigation.navigate('Login');

            return () => {
                clearTimeout(x);
            };
        }, 1000);
    }, [navigation]);

    const handleInvalid = useCallback(() => {
        ToasInvalid('Kode OTP Salah');
    }, []);

    const handleForgotePassword = useCallback(() => {
        if (validatePassword(password)) {
            if (password === passwordTwo) {
                const data = {
                    otp: kode,
                    new_password: password,
                };
                if (kode) {
                    dispatch(forgotePassword(data, handleSuccess, handleInvalid));
                }
            } else {
                ToastAndroid.showWithGravity('Password tidak sama',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
        } else {
            ToastAndroid.showWithGravity('Password tidak valid',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }, [dispatch, password, passwordTwo, kode, handleSuccess, handleInvalid]);

    const resendSuccess = useCallback(() => {
        ToasSuccess('Success !');
    }, []);

    const resendError = useCallback(() => {
        ToastAndroid.showWithGravity('Email tidak ditemukan',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }, []);

    const handleActiveAkun = useCallback(() => {
        const emailAkun = route.params.email;
        // console.log(emailAkun);
        if (validateEmail(emailAkun)) {
            dispatch(getOtpForgote(emailAkun, resendSuccess, resendError));
        } else {
            ToastAndroid.showWithGravity('Email tidak valid',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }, [route, dispatch, resendSuccess, resendError]);

    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor={color.mainColor} barStyle="light-content" />
            <View style={styles.Head}>
                <Text style={{
                    fontSize: sizeFont(4),
                    color: color.fontWhite,
                    fontFamily: Poppins.Medium,
                }}>Forgote Password</Text>
            </View>
            <View style={{
                paddingHorizontal: sizeWidth(5),
                marginTop: heightPercentageToDP(5),
            }}>
                <TextInput
                    onChangeText={(e) => setPassword(e)}
                    onFocus={() => setOnfocus(0)}
                    placeholder="Masukkan password baru"
                    style={[styles.Input,
                    onFocus === 0 && {
                        borderColor: color.mainColor,
                    },
                    ]}
                    secureTextEntry={true}
                />
                <Text style={{
                    fontSize: sizeFont(2.6),
                    color: color.fontBlack2,
                    marginBottom: heightPercentageToDP(1),
                    marginLeft: sizeWidth(2),
                }}>* Password 8 karakter dengan huruf besar, kecil dan angka</Text>
                <TextInput
                    onChangeText={(e) => setPasswordTuo(e)}
                    onFocus={() => setOnfocus(1)}
                    placeholder="Ulangi password"
                    secureTextEntry={true}
                    style={[styles.Input,
                    onFocus === 1 && {
                        borderColor: color.mainColor,
                    },
                    ]}
                />
                <TextInput
                    onChangeText={(e) => setKode(e)}
                    onFocus={() => setOnfocus(2)}
                    placeholder="Masukkan Kode"
                    style={[styles.Input,
                    onFocus === 2 && {
                        borderColor: color.mainColor,
                    },
                    ]}
                />
            </View>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: sizeWidth(5),
            }}>
                <TouchableOpacity
                    onPress={() => handleForgotePassword()}
                    activeOpacity={0.8}
                    style={styles.BtnKirim}
                >
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                        textAlign: 'center',
                        color: color.fontWhite,
                    }}>Kirim</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'left', fontSize: sizeFont(3.3), marginTop: heightPercentageToDP(5), marginLeft: sizeWidth(5) }}>Tidak menerima kode ?
                    <Text
                    onPress={() => handleActiveAkun()}
                    style={{ color: color.mainColor }}
                > Kirim ulang</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    Head: {
        height: heightPercentageToDP(6.5),
        backgroundColor: color.mainColor,
        justifyContent: 'center',
        paddingHorizontal: sizeWidth(5),
    },
    Input: {
        borderWidth: 2,
        borderColor: color.border2,
        paddingLeft: sizeWidth(3),
        borderRadius: 8,
        fontSize: sizeFont(3.5),
        fontFamily: Poppins.Regular,
        marginBottom: heightPercentageToDP(2),
    },
    BtnKirim: {
        backgroundColor: color.mainColor,
        borderRadius: 8,
        paddingHorizontal: sizeWidth(5),
        paddingVertical: heightPercentageToDP(1),
    },
});
