/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { color } from '../assets/colors/Index';
import { SCREEN_WIDTH } from '../assets/responsive';
import { getIdUser } from '../config/function';
import { LoginAdmin } from '../redux/actions/Login';

export default function Auth({ navigation }) {

    const dispatch = useDispatch();
    const cekLogin = React.useCallback(async () => {
        const idUser = await getIdUser();
        const spalsh = await AsyncStorage.getItem('splash');
        const x = setTimeout(() => {
            if (idUser !== null) {
                navigation.replace('MyTabbar');
            } else {
                if (spalsh == null) {
                    navigation.replace('Splash');
                } else {
                    navigation.replace('Login');
                }
            }
            return () => {
                clearTimeout(x);
            };
        }, 1000);
    }, [navigation]);

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

    useEffect(() => {
        handleLoginAdmin();

        return () => {
            handleLoginAdmin();
        };

    }, [handleLoginAdmin]);


    React.useEffect(() => {
        cekLogin();
    }, [cekLogin]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: color.bgWhite,
        }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} showHideTransition={true} />
            <View
                style={{
                    width: SCREEN_WIDTH,
                    height: heightPercentageToDP(75),
                }}
            >
                <Image resizeMethod="auto" source={require('../assets/images/Splash/Background.png')} style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'stretch',
                    position: 'absolute',
                }} />
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image resizeMethod="auto" source={require('../assets/images/Splash/Logo.png')} style={{
                        width: '50%',
                        height: '35%',
                        resizeMode: 'contain',
                    }} />
                </View>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image resizeMethod="auto" source={require('../assets/images/loading/loadingSplash.gif')} style={{
                    width: '50%',
                    height: '55%',
                    resizeMode: 'contain',
                }} />
            </View>
        </View>
    );
}
