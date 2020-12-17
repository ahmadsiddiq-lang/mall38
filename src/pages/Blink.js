import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function Blink({ navigation, route }) {
    useEffect(() => {
        navigation.navigate('DetailProduk', {
            idProduk: route.params.idProduk,
        });
    });
    return (<View />);
}

