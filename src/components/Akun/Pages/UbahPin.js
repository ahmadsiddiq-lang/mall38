/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { color } from '../../../assets/colors/Index';
import { Poppins } from '../../../assets/fonts';
import { SCREEN_HEIGHT, SCREEN_WIDTH, sizeFont, sizeWidth } from '../../../assets/responsive';
import { getIdUser, ToasSuccess, validatePassword } from '../../../config/function';
import Headers from '../../Header/Headers';
import { checkPassword, updatePssword } from '../../../redux/actions/User';

export default function UbahPin({ navigation }) {

    const dispatch = useDispatch();

    const [passwordLama, setPasswordLama] = useState(null);
    const [passwordBaru, setPasswordBaru] = useState(null);
    const [passwordKonfir, setPasswordKonfir] = useState(null);
    const [indexOf, setIndexOf] = useState(null);
    const [err, setErr] = useState(null);
    const [errKonfir, setErrKonfir] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePassLama = useCallback(async () => {
        if (validatePassword(passwordLama)) {
            const idUser = await getIdUser();
            const data = {
                user_id: idUser,
                old_password: passwordLama,
            };
            dispatch(checkPassword(data, setErr));
        } else {
            console.log('Error');
            setErr(0);
        }
    }, [passwordLama, dispatch]);

    const handleSuccess = useCallback(() => {
        ToasSuccess('Success !');
        const x = setTimeout(() => {
            navigation.goBack();
            return () => {
                clearTimeout(x);
                setPasswordLama(null);
                setPasswordBaru(null);
                setPasswordKonfir(null);
                setLoading(false);
            };
        }, 1000);
    }, [navigation]);

    const handleUpdatePass = useCallback(async () => {
        if (err > 0) {
            if (validatePassword(passwordBaru)) {
                if (passwordBaru === passwordKonfir) {
                    const idUser = await getIdUser();
                    const data = {
                        user_id: idUser,
                        new_password: passwordBaru,
                    };
                    setLoading(true);
                    dispatch(updatePssword(data, handleSuccess));
                } else {
                    setErrKonfir(0);
                }
            } else {
                setErrKonfir(1);
            }
        }
    }, [err, passwordBaru, passwordKonfir, dispatch, handleSuccess]);

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Ubah Password'}
            />
            <ScrollView>
                <View style={{
                    flex: 1,
                    paddingTop: heightPercentageToDP(5),
                    zIndex: -999,
                }}>
                    <View style={{
                        paddingHorizontal: sizeWidth(5),
                        marginBottom: heightPercentageToDP(2),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            marginBottom: heightPercentageToDP(2),
                        }}>Password lama</Text>
                        <TextInput
                            onChangeText={(e) => setPasswordLama(e)}
                            secureTextEntry={true}
                            onFocus={() => {
                                setIndexOf(0);
                            }}
                            onBlur={() => {
                                handlePassLama();
                                setIndexOf(null);
                            }}
                            style={[styles.Input,
                            indexOf === 0 && {
                                borderColor: color.mainColor,
                            },
                            ]}
                        />
                        {
                            err !== null &&
                            <Text style={{
                                fontSize: sizeFont(3),
                                color: err === 0 ? 'red' : 'green',
                            }}>{err === 0 ? 'Password tidak valid' : 'Password benar'}</Text>
                        }
                    </View>
                    <View style={{
                        paddingHorizontal: sizeWidth(5),
                        marginBottom: heightPercentageToDP(2),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            marginBottom: heightPercentageToDP(2),
                        }}>Password baru</Text>
                        <TextInput
                            onChangeText={(e) => setPasswordBaru(e)}
                            secureTextEntry={true}
                            onFocus={() => setIndexOf(1)}
                            onBlur={() => setIndexOf(null)}
                            style={[styles.Input,
                            indexOf === 1 && {
                                borderColor: color.mainColor,
                            },
                            ]}
                        />
                        <Text style={{
                            fontSize: sizeFont(3),
                            color: color.fontBlack2,
                            marginTop: heightPercentageToDP(1),
                        }}>* Password 8 karakter dengan huruf besar, kecil dan angka</Text>
                    </View>
                    <View style={{
                        paddingHorizontal: sizeWidth(5),
                        marginBottom: heightPercentageToDP(2),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            marginBottom: heightPercentageToDP(2),
                        }}>Konfirmasi password baru</Text>
                        <TextInput
                            onChangeText={(e) => setPasswordKonfir(e)}
                            secureTextEntry={true}
                            onFocus={() => setIndexOf(2)}
                            onBlur={() => setIndexOf(null)}
                            style={[styles.Input,
                            indexOf === 2 && {
                                borderColor: color.mainColor,
                            },
                            ]}
                        />
                        {
                            errKonfir !== null &&
                            <>
                                {
                                    errKonfir === 0 ?
                                        <Text style={{
                                            fontSize: sizeFont(3),
                                            color: 'red',
                                        }}>Password tidak sama</Text>
                                        :
                                        <Text style={{
                                            fontSize: sizeFont(3),
                                            color: 'red',
                                        }}>Password tidak valid</Text>
                                }
                            </>
                        }
                    </View>
                    <View style={{
                        alignItems: 'flex-end',
                        paddingHorizontal: sizeWidth(5),
                        marginTop: heightPercentageToDP(4),
                    }}>
                        <TouchableOpacity
                            onPress={() => handleUpdatePass()}
                            activeOpacity={0.8}
                            style={styles.Btn}
                        >
                            <Text style={{
                                fontSize: sizeFont(3.5),
                                color: color.fontWhite,
                                fontFamily: Poppins.Medium,
                            }}>Ubah Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {
                loading &&
                <View style={{
                    position: 'absolute',
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    alignItems: 'center',
                    paddingTop: heightPercentageToDP(40),
                    zIndex: 999,
                }}>
                    <ActivityIndicator size="large" color={color.mainColor} />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    Input: {
        borderWidth: 1,
        borderColor: color.border2,
        elevation: 3,
        backgroundColor: color.bgWhite,
        borderRadius: 8,
        fontSize: sizeFont(3.5),
        fontFamily: Poppins.Regular,
        paddingHorizontal: sizeWidth(3),
    },
    Btn: {
        paddingHorizontal: sizeWidth(5),
        paddingVertical: heightPercentageToDP(1),
        backgroundColor: color.mainColor,
        alignItems: 'center',
        borderRadius: 8,
        elevation: 5,
    },
});
