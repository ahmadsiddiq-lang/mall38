import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sizeHeight } from '../assets/responsive';
import Banner from '../components/DetailProduk/Banner';
import ButtonBuy from '../components/DetailProduk/ButtonBuy';
import Deskripsi from '../components/DetailProduk/Deskripsi';
import Rekomendasi from '../components/DetailProduk/Rekomendasi';
import Headers from '../components/Header/HeaderDetailProduk';
import { objekEmpty } from '../config/function';
import { getDetailProduk } from '../redux/actions/DetailProduk';

export default function DetailProduk({ navigation, route }) {

    const dispatch = useDispatch();

    const dataProduk = useSelector(state => state.produk.produk);
    const detailProduk = useSelector(state => state.detailProduk.detailProduk);
    const getDetailProduks = useCallback(() => {
        const idProduk = route.params.idProduk;
        if (idProduk) {
            dispatch(getDetailProduk(idProduk));
        }
    }, [dispatch, route.params.idProduk]);

    useEffect(() => {
        getDetailProduks();
    }, [getDetailProduks]);

    return (
        <View style={styles.Container}>
            {
                objekEmpty(detailProduk) &&
                <ScrollView
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                    }}
                >
                    <Headers navigation={navigation} title={'Detail Produk'} />
                    <Banner navigation={navigation} detailProduk={detailProduk} />
                    <Deskripsi detailProduk={detailProduk} />
                    <Rekomendasi navigation={navigation} dataProduk={dataProduk} />
                </ScrollView>
            }
            <ButtonBuy />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
