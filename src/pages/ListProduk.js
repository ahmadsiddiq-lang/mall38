/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { color } from '../assets/colors/Index';
import { sizeFont } from '../assets/responsive';
import Headers from '../components/Header/HeaderWithIcon';
import ListProdukCompenet from '../components/ListProduk/ListProdukCompenet';

export default function ListProduk({ navigation, route }) {

    const title = route.params.title !== undefined ? route.params.title : '';
    const dataProduk = route.params.dataProduk !== undefined && route.params.dataProduk;

    // console.log(dataProduk);

    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={title} />
            {
                dataProduk !== null ?
                    <ListProdukCompenet
                        navigation={navigation}
                        dataProduk={dataProduk}
                    />
                    :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontBlack1,
                        }}>Produk belum tersedia</Text>
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
});
