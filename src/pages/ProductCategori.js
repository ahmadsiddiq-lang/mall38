/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Categori from '../components/ProdukCategori/Categori';
import ListProduk from '../components/ProdukCategori/ListProduk';
import { getProdukCategori } from '../redux/actions/ProdukCategori';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

export const HeaderProdukCategori = ({ navigation }) => {
    return {
        headerTitle: 'Produk Kategori',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? color.mainColor : '',
        },
        headerTinColor: Platform.OS === 'android' ? 'white' : color.mainColor,
        headerLeft: () => {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                    style={{
                        padding: sizeWidth(5),
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={sizeFont(5)}
                        color={color.fontWhite}
                    />
                </TouchableOpacity>
            );
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
            color: 'white',
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans',
            color: 'white',
        },
    };
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
});
