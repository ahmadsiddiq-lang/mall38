/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAdmin, LoginUser } from '../redux/actions/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

    const dispatch = useDispatch();
    const [focus, setFocus] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    // const dataUser = useSelector(state => state.dataLogin.dataUser);
    const dataAdmin = useSelector(state => state.dataLogin.dataAdmin);

    const handleErrorLogin = useCallback(async () => {
        ToastAndroid.showWithGravity('Email atau Password Anda salah', ToastAndroid.LONG, ToastAndroid.CENTER);
    }, []);

    const handleLoginSuccess = useCallback(async (idUser) => {
        try {
            const id = JSON.stringify(idUser.id);
            await AsyncStorage.setItem('idUser', id);
            navigation.navigate('Home');
        } catch (e) {
            // saving error
            console.log(e);
        }
    }, [navigation]);

    const handleLogin = useCallback(async () => {
        const value = await AsyncStorage.getItem('token');
        const data = {
            email: email,
            password: password,
        };
        if (email !== null && password !== null && value) {
            dispatch(LoginUser(data, handleErrorLogin, handleLoginSuccess));
        }
    }, [dispatch, email, password, handleErrorLogin, handleLoginSuccess]);

    const handleLoginAdmin = useCallback(async () => {
        const data = {
            email: 'info@mall38.com',
            password: 'mall38diloka',
        };
        dispatch(LoginAdmin(data));
    }, [dispatch]);

    // console.log(dataAdmin);
    const storeData = useCallback(async (value) => {
        try {
            await AsyncStorage.setItem('token', value);
        } catch (e) {
            // saving error
            console.log(e);
        }
    }, []);

    useEffect(() => {
        handleLoginAdmin();
        if (dataAdmin.length) {
            storeData(dataAdmin.token);
        }
    }, [dataAdmin, handleLoginAdmin, storeData]);

    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor={color.bgWhite} barStyle="dark-content" />
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
                            <Text style={{
                                fontSize: sizeFont(6),
                                fontFamily: Poppins.BoldItalic,
                                color: color.mainColor,
                            }}>Login</Text>
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
                                    borderWidth: 3,
                                    borderColor: color.mainColor,
                                },
                                ]}>
                                    <FontAwesome5 name="at" color={color.mainColor} size={sizeFont(5)} solid />
                                    <TextInput
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
                                        onChangeText={(e) => setPassword(e)}
                                        secureTextEntry={true}
                                        onBlur={() => setFocus(null)}
                                        onFocus={() => setFocus(1)}
                                        style={styles.Input}
                                        placeholder="Password"
                                    />
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
                                        flex: 1,
                                        textAlign: 'center',
                                    }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.BoxRegister}>
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.fontWhite,
                        marginTop: sizeHeight(2),
                        fontFamily: Poppins.Italic,
                        marginRight: sizeWidth(3),
                    }}>Forgot password ?</Text>
                    <TouchableOpacity
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
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.mainColor,
    },
    BackgroundWhite: {
        height: sizeHeight(68),
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
