import React, { useCallback, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/DetailProduk/Banner';
import ButtonBuy from '../components/DetailProduk/ButtonBuy';
import Deskripsi from '../components/DetailProduk/Deskripsi';
import Rekomendasi from '../components/DetailProduk/Rekomendasi';
import Headers from '../components/Header/HeaderDetailProduk';
import { objekEmpty } from '../config/function';
import { getDetailProduk } from '../redux/actions/DetailProduk';

export default function DetailProduk({ navigation, route }) {

    const dispatch = useDispatch();
    const refScroll = useRef(null);

    const dataProduk = useSelector(state => state.produk.produk);
    const detailProduk = useSelector(state => state.detailProduk.detailProduk);


    const getDetailProduks = useCallback(() => {
        const idProduk = route.params.idProduk;
        if (idProduk) {
            dispatch(getDetailProduk(idProduk));
        }
    }, [dispatch, route.params.idProduk]);

    const goToTop = (id) => {
        refScroll.current.scrollTo({ x: 0, y: 0, animated: true });
        navigation.navigate('DetailProduk', {
            idProduk: id,
        });
    };

    useEffect(() => {
        getDetailProduks();
    }, [getDetailProduks]);

    return (
        <View style={styles.Container}>
            {
                objekEmpty(detailProduk) &&
                <ScrollView
                    ref={refScroll}
                >
                    <Headers navigation={navigation} title={'Detail Produk'} />
                    <Banner navigation={navigation} detailProduk={detailProduk} />
                    <Deskripsi detailProduk={detailProduk} />
                    <Rekomendasi
                        goToTop={goToTop}
                        navigation={navigation}
                        dataProduk={dataProduk} />
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
