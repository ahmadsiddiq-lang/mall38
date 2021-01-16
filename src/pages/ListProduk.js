import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Headers from '../components/Header/HeaderWithIcon';
import ListProdukCompenet from '../components/ListProduk/ListProdukCompenet';

export default function ListProduk({ navigation, route }) {

    const title = route.params.title !== undefined ? route.params.title : '';
    const dataProduk = route.params.dataProduk !== undefined && route.params.dataProduk;

    // console.log(dataProduk);

    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={title} />
            <ListProdukCompenet
                navigation={navigation}
                dataProduk={dataProduk}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
