/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, Image, StatusBar, Text, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../assets/responsive';
import { getIdUser } from '../config/function';

export default function Auth({ navigation }) {

    const cekLogin = React.useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            navigation.replace('MyTabbar');
        } else {
            navigation.replace('Login');
        }
    }, [navigation]);


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
