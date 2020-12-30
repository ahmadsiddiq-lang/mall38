/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import Categori from '../components/ProdukCategori/Categori';
import ListProduk from '../components/ProdukCategori/ListProduk';
import { getProdukCategori } from '../redux/actions/ProdukCategori';
import Headers from '../components/Header/Headers';

export default function ProductCategori({ navigation, route }) {
    const dispatch = useDispatch();
    const dataProdukCategori = useSelector(state => state.produkCategori.produkCategori);
    const dataCategori = useSelector(state => state.categori.categori);

    const getProdukCategoris = useCallback(async () => {
        const idCategori = route.params.idCategori;
        if (idCategori) { dispatch(getProdukCategori(idCategori)); }
    }, [dispatch, route.params.idCategori]);

    useEffect(() => {
        getProdukCategoris();
        return () => {
            getProdukCategoris();
        };
    }, [getProdukCategoris]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <Headers navigation={navigation} title={'Produk Kategori'} />
            <Categori
                navigation={navigation}
                dataCategori={dataCategori} />
            <View style={{
                flex: 1,
            }}>
                <ListProduk navigation={navigation} dataProdukCategori={dataProdukCategori} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
});
