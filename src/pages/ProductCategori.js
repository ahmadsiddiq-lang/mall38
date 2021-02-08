/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import Categori from '../components/ProdukCategori/Categori';
import ListProduk from '../components/ProdukCategori/ListProduk';
import { clearData, getProdukCategori } from '../redux/actions/ProdukCategori';
import Headers from '../components/Header/Headers';

export default function ProductCategori({ navigation, route }) {
    const dispatch = useDispatch();
    const dataProdukCategori = useSelector(state => state.produkCategori.produkCategori);
    const dataCategori = useSelector(state => state.categori.categori);
    const [bannerCategry, setBanner] = useState(null);

    // console.log(dataCategori);

    const getProdukCategoris = useCallback(async () => {
        dispatch(clearData());
        const data = route.params.category;
        const banner = data.image_banner;
        const idCategori = data.id;
        const x = setTimeout(() => {
            if (idCategori) {
                setBanner(banner);
                dispatch(getProdukCategori(idCategori));
            }
            return () => {
                clearTimeout(x);
            };
        }, 1000);
    }, [dispatch, route]);

    useEffect(() => {
        getProdukCategoris();
        return () => {
            setBanner(null);
        };
    }, [getProdukCategoris]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <Headers navigation={navigation} title={'Produk Kategori'} />
            <Categori
                navigation={navigation}
                setBanner={setBanner}
                dataCategori={dataCategori} />
            <View style={{
                flex: 1,
            }}>
                <ListProduk
                    bannerCategry={bannerCategry}
                    navigation={navigation}
                    dataProdukCategori={dataProdukCategori} />
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
