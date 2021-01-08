/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Image, StatusBar, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { color } from '../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../assets/responsive';
import { getIdUser } from '../config/function';
import { LoginAdmin } from '../redux/actions/Login';

export default function Auth({ navigation }) {

    const dispatch = useDispatch();
    const cekLogin = React.useCallback(async () => {
        const idUser = await getIdUser();
        const x = setTimeout(() => {
            if (idUser !== null) {
                navigation.replace('MyTabbar');
            } else {
                navigation.replace('Login');
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
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <StatusBar backgroundColor={color.bgWhite} />
            <View
                style={{
                    width: sizeWidth(70),
                    height: sizeHeight(10),
                    marginBottom: sizeHeight(20),
                }}
            >
                <Image resizeMethod="auto" source={require('../assets/images/logo/logo.png')} style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                }} />
                <ActivityIndicator size="large" color={color.mainColor} style={{
                    marginTop: sizeHeight(10),
                }} />
            </View>
        </View>
    );
}
