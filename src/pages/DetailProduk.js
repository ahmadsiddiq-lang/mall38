/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import Banner from '../components/DetailProduk/Banner';
import ButtonBuy from '../components/DetailProduk/ButtonBuy';
import Deskripsi from '../components/DetailProduk/Deskripsi';
import Rekomendasi from '../components/DetailProduk/Rekomendasi';
import Headers from '../components/Header/HeaderDetailProduk';
import { getIdUser, objekEmpty, ToasSuccess } from '../config/function';
import { addCart, getCArt } from '../redux/actions/Cart';
import { getDetailProduk, clearDetailProduk } from '../redux/actions/DetailProduk';

export default function DetailProduk({ navigation, route }) {

    const dispatch = useDispatch();
    const refScroll = useRef(null);

    const yOffset = useRef(new Animated.Value(0)).current;
    const headerOpacity = yOffset.interpolate({
        inputRange: [0, 200],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const dataProduk = useSelector(state => state.produk.produk);
    const detailProduk = useSelector(state => state.detailProduk.detailProduk);
    // const responAddCart = useSelector(state => state.cart.responAddCart);

    const getDetailProduks = useCallback(() => {
        const idProduk = route.params.idProduk;
        if (idProduk) {
            dispatch(getDetailProduk(idProduk));
        }
    }, [dispatch, route.params.idProduk]);

    const goToTop = useCallback((idProduk) => {
        refScroll.current.scrollTo({ x: 0, y: 0, animated: true });
        yOffset.setValue(0);
        clearDetailProduks();
        if (idProduk) {
            dispatch(getDetailProduk(idProduk));
        }
    }, [dispatch, clearDetailProduks, yOffset]);

    const handleAddTocat = useCallback(async (item) => {
        const idUser = await getIdUser();
        const idProduk = item.id;
        const data = {
            user_id: idUser,
            product_id: idProduk,
            qty: 1,
        };
        if (data.product_id && data.user_id) {
            dispatch(addCart(data));
            dispatch(getCArt(idUser));
            ToasSuccess('Dimasukkan ke keranjang');
        } else {
            navigation.navigate('Login');
        }
    }, [dispatch, navigation]);

    const handleBuy = useCallback(async (item) => {
        const idUser = await getIdUser();
        const idProduk = item.id;
        const data = {
            user_id: idUser,
            product_id: idProduk,
            qty: 1,
        };
        if (data.product_id && data.user_id) {
            dispatch(addCart(data));
            navigation.navigate('Cart');
        } else {
            navigation.navigate('Login');
        }
    }, [dispatch, navigation]);

    const clearDetailProduks = useCallback(async () => {
        dispatch(clearDetailProduk());
    }, [dispatch]);

    useEffect(() => {
        getDetailProduks();
    }, [getDetailProduks]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Headers
                headerOpacity={headerOpacity}
                navigation={navigation}
                clearDetailProduks={clearDetailProduks} />

            {
                objekEmpty(detailProduk) ?
                    <Animated.ScrollView
                        ref={refScroll}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: yOffset,
                                        },
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}
                        scrollEventThrottle={16}
                    >
                        <Banner navigation={navigation} detailProduk={detailProduk} />
                        <Deskripsi detailProduk={detailProduk} />
                        <Rekomendasi
                            goToTop={goToTop}
                            navigation={navigation}
                            dataProduk={dataProduk} />
                    </Animated.ScrollView>
                    :
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator size="large" color={color.mainColor} />
                    </View>
            }
            <ButtonBuy
                handleBuy={handleBuy}
                handleAddTocat={handleAddTocat}
                navigation={navigation}
                detailProduk={detailProduk} />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
