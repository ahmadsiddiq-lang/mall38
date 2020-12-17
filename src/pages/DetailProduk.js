import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { sizeHeight } from '../assets/responsive';
import Banner from '../components/DetailProduk/Banner';
import ButtonBuy from '../components/DetailProduk/ButtonBuy';
import Deskripsi from '../components/DetailProduk/Deskripsi';
import Rekomendasi from '../components/DetailProduk/Rekomendasi';
import Headers from '../components/Header/HeaderDetailProduk';

export default function DetailProduk({ navigation, route }) {

    // console.log(route.params);

    const dataProduk = useSelector(state => state.produk.produk);

    return (
        <View style={styles.Container}>
            <ScrollView>
                <Headers navigation={navigation} title={'Detail Produk'} />
                <Banner />
                <Deskripsi />
                <Rekomendasi dataProduk={dataProduk} />
            </ScrollView>
            <ButtonBuy />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
