import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import ListProduk from '../components/Produk/ListProduk';
import { getProduk } from '../redux/actions/Produk';
import Header from '../components/Header/Home';


export default function Product({ navigation }) {
    const dispatch = useDispatch();

    const dataProduk = useSelector(state => state.produk.produk);
    const [refreshing, setRefreshing] = React.useState(false);


    const wait = useCallback((timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            getProduks();
            setRefreshing(false);
        });
    }, [wait, getProduks]);

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
            <Header navigation={navigation} />
            <ListProduk
                refreshing={refreshing}
                onRefresh={onRefresh}
                navigation={navigation}
                dataProduk={dataProduk}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
});
