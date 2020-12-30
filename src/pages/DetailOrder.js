/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../assets/responsive';
import Alamat from '../components/DetailOrder/Alamat';
import CardProduk from '../components/DetailOrder/CardProduk';
import Headers from '../components/Header/Headers';

export default function DetailOrder({ navigation, route }) {

    // console.log(route.params.orderId);
    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={'Detail Pesanan'} />
            <Alamat />
            <View style={styles.BoxCard}>
                <CardProduk />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    BoxCard: {
        backgroundColor: color.bgWhite,
        marginBottom: sizeHeight(1),
        paddingHorizontal: sizeWidth(5),
    },
});
