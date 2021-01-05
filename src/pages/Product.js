import React, { useCallback, useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import ListProduk from '../components/Produk/ListProduk';
import { getProduk } from '../redux/actions/Produk';
import Header from '../components/Header/Home';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

export default function Product({ navigation }) {
    const dispatch = useDispatch();

    const dataProduk = useSelector(state => state.produk.produk);
    const [refreshing, setRefreshing] = React.useState(false);

    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
    const [visible, setVisible] = useState(false);
    const ProdukRef = React.useRef();

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
        dispatch(getProduk(setVisible));
    }, [dispatch]);

    React.useEffect(() => {
        if (ProdukRef !== null) {
            const facebookAnimated = Animated.stagger(400, [ProdukRef.current.getAnimated()]);
            Animated.loop(facebookAnimated).start();
        }
    }, [ProdukRef]);

    useEffect(() => {
        getProduks();
    }, [getProduks]);

    return (
        <View style={styles.Container}>
            <Header navigation={navigation} />
            <ListProduk
                refreshing={refreshing}
                onRefresh={onRefresh}
                navigation={navigation}
                dataProduk={dataProduk}
                ProdukRef={ProdukRef}
                visible={visible}
                ShimmerPlaceHolder={ShimmerPlaceHolder}
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
