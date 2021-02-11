/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
// import { StackActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { resendOTP, setOtp } from '../redux/actions/Register';
import { getDataUser } from '../redux/actions/User';
import { getCArt } from '../redux/actions/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToasInvalid, ToasSuccess, validateEmail } from '../config/function';

export default function SetOTP({ navigation, route }) {
    const dispatch = useDispatch();
    // const [indexOf, setIndex] = React.useState(null);
    // const [kode, setKode] = React.useState([]);
    const [kode, setKode] = React.useState('');
    const [loading, setLoading] = useState(false);

    // const inputRefs = Array(6).fill(React.createRef());

    // const goNextAfterEdit = (e, index) => {
    //     // console.log(e);
    //     const newData = [...kode];
    //     newData.push(e);
    //     setKode(newData);
    //     if (e > 0) {
    //         if (index < inputRefs.length - 1) {
    //             inputRefs[index + 1].focus();
    //         }
    //     }
    //     else if (index > 0 || e === 0) {
    //         inputRefs[index - 1].focus();
    //         const newKode = [...kode];
    //         newKode.pop();
    //         setKode(newKode);
    //     }
    //     console.log(e);
    // };

    const handleReponsSucces = useCallback(async (idUser) => {
        try {
            const id = JSON.stringify(idUser.id);
            dispatch(getDataUser(id));
            dispatch(getCArt(id));
            setLoading(false);
            await AsyncStorage.setItem('idUser', id);
            setTimeout(() => {
                navigation.replace('MyTabbar');
                setKode([]);
            }, 1000);
        } catch (e) {
            // saving error
            setLoading(false);
            console.log(e);
        }
    }, [navigation, dispatch]);

    const handleError = useCallback(() => {
        // console.log(err);
        ToasInvalid('Kode tidak valid');
        setLoading(false);
        setKode([]);
    }, []);

    const handleButton = useCallback(() => {
        // const kodeNew = { otp: kode.join('') };
        const kodeNew = { otp: kode };
        // console.log(kode);
        if (kode.length > 0) {
            setLoading(true);
            dispatch(setOtp(kodeNew, handleReponsSucces, handleError));
        } else {
            ToastAndroid.showWithGravity('Masukkan kode', ToastAndroid.CENTER, ToastAndroid.SHORT);
            setLoading(false);
        }

    }, [kode, dispatch, handleReponsSucces, handleError]);

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
            dispatch(resendOTP(emailAkun, resendSuccess, resendError));
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
            {
                loading &&
                <View style={{
                    position: 'absolute',
                    width: SCREEN_WIDTH,
                    height: hp(80),
                    zIndex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator size="large" color={color.mainColor} />
                </View>
            }
            <View style={styles.Head}>
                <Text style={{
                    color: color.fontWhite,
                    fontSize: sizeFont(4),
                }}>Kode OTP</Text>
            </View>
            <View style={styles.BoxContentLogin}>
                <Text style={{
                    color: color.mainColor,
                    fontSize: sizeFont(6),
                    fontFamily: Poppins.Medium,
                    textAlign: 'center',
                    marginTop: hp(6),
                }}>Masukkan Kode OTP</Text>
                <Text style={{ fontSize: sizeFont(3.3), marginVertical: 20, color: color.fontBody1 }}>Masukkan kode verifikasi yang telah dikirim ke alamat email Anda</Text>
                <View style={styles.BOxContent}>
                    {/* <View style={styles.BoxItem}>
                        {
                            inputRefs.map((item, index) => {
                                return (
                                    <TextInput key={index}
                                        onChangeText={(e) => goNextAfterEdit(e, index)}
                                        ref={r => inputRefs[index] = r}
                                        maxLength={1}
                                        keyboardType="numeric"
                                        onFocus={() => setIndex(index)}
                                        selectionColor={color.background2}
                                        style={[styles.TextInput, {
                                            borderColor: indexOf === index ? color.mainColor : color.border1,
                                        }]} />
                                );
                            })
                        }
                    </View> */}
                    <TextInput
                        maxLength={7}
                        onChangeText={(e) => setKode(e)}
                        keyboardType="number-pad"
                        placeholder="KODE OTP"
                        style={{
                            backgroundColor: color.bgWhite,
                            elevation: 3,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: color.mainColor,
                            textAlign: 'center',
                            fontSize: sizeFont(6),
                        }}
                    />
                </View>
                <View style={styles.Footer}>
                    <TouchableOpacity onPress={() => {
                        // navigation.dispatch(StackActions.replace('Login'));
                        handleButton();
                    }}
                        activeOpacity={0.6} style={styles.BtnLogin}
                    >
                        <Text style={{ color: color.fontWhite, fontSize: sizeFont(3.5), fontFamily: Poppins.Medium }}>Verifikasi</Text>
                    </TouchableOpacity>

                    <Text style={{ textAlign: 'left', fontSize: sizeFont(3.3), color: color.fontBlack1 }}>* Jika kode tidak masuk coba buka spam pada email Anda</Text>

                    <Text style={{ textAlign: 'left', fontSize: sizeFont(3.3), marginTop: sizeHeight(2) }}>Tidak menerima kode ?
                    <Text
                            onPress={() => handleActiveAkun()}
                            style={{ color: color.mainColor }}
                        > Kirim ulang</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    Head: {
        backgroundColor: color.mainColor,
        height: hp(6.5),
        paddingHorizontal: sizeWidth(5),
        justifyContent: 'center',
    },
    BtnBack: {
        marginRight: 20,
        position: 'absolute',
        left: 20,
        padding: 8,
        paddingLeft: 0,
    },
    BoxContentLogin: {
        // borderWidth: 1,
        marginTop: 50,
        paddingHorizontal: 20,
    },
    BOxContent: {
        // borderWidth: 1,
        marginTop: 30,
    },
    BoxItem: {
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TextInput: {
        borderBottomWidth: 2,
        borderColor: color.border2,
        width: '15%',
        borderRadius: 7,
        textAlign: 'center',
        paddingVertical: 5,
        fontFamily: Poppins.Bold,
        fontSize: sizeFont(5),
        paddingBottom: 5,
        paddingTop: 10,
    },
    Footer: {
        marginVertical: 30,
        marginTop: 50,
    },
    BtnLogin: {
        backgroundColor: color.mainColor,
        alignItems: 'center',
        padding: 8,
        borderRadius: 7,
        marginBottom: 20,
    },
});
