import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ListProduk from '../components/Produk/ListProduk';
import { getProduk } from '../redux/actions/Produk';


export default function Product({ navigation }) {
    const dispatch = useDispatch();

    const dataProduk = useSelector(state => state.produk.produk);

    const getProduks = useCallback(async () => {
        dispatch(getProduk());
    }, [dispatch]);


    useEffect(() => {
        getProduks();
        return () => {
            getProduks();
        };
    }, [getProduks]);

    return (
        <View style={styles.Container}>
            <ListProduk navigation={navigation} dataProduk={dataProduk} />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
