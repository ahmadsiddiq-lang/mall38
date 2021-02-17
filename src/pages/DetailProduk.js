/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, BackHandler, Share, StatusBar, StyleSheet, View } from 'react-native';
import base64 from 'react-native-base64';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import Banner from '../components/DetailProduk/Banner';
import ButtonBuy from '../components/DetailProduk/ButtonBuy';
import Deskripsi from '../components/DetailProduk/Deskripsi';
import Rekomendasi from '../components/DetailProduk/Rekomendasi';
import Headers from '../components/Header/HeaderDetailProduk';
import { getIdUser, objekEmpty, ToasInvalid, ToasSuccess } from '../config/function';
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
    const dataCart = useSelector(state => state.cart.dataCart);
    // const responAddCart = useSelector(state => state.cart.responAddCart);

    // console.log(route);

    const getDetailProduks = useCallback(() => {
        const idProdukDeep = route.params.idProdukDeep;
        const idProduk = route.params.idProduk;
        if (idProduk) {
            dispatch(getDetailProduk(idProduk));
        } else {
            const decode = base64.decode(idProdukDeep.toString());
            dispatch(getDetailProduk(decode));
        }
    }, [dispatch, route]);

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
            if (dataCart.length <= 25) {
                dispatch(addCart(data));
                dispatch(getCArt(idUser));
                ToasSuccess('Dimasukkan ke keranjang');
            } else {
                ToasInvalid('Maximum Keranjang 25 item');
            }
        }
    }, [dispatch, dataCart]);

    const handleBuy = useCallback(async (item) => {
        const idUser = await getIdUser();
        const idProduk = item.id;
        const data = {
            user_id: idUser,
            product_id: idProduk,
            qty: 1,
        };
        if (data.product_id && data.user_id) {
            if (dataCart.length <= 25) {
                dispatch(addCart(data));
                navigation.navigate('Cart');
            } else {
                ToasInvalid('Maximum Keranjang 25 item');
            }
        }
    }, [dispatch, navigation, dataCart]);

    const clearDetailProduks = useCallback(async () => {
        dispatch(clearDetailProduk());
    }, [dispatch]);

    const handleBackButtonClick = useCallback(() => {
        const idProdukDeep = route.params.idProdukDeep;
        if (idProdukDeep) {
            navigation.navigate('MyTabbar');
            clearDetailProduks();
            // return true;
        } else {
            navigation.goBack();
            clearDetailProduks();
        }
        return true;
    }, [navigation, clearDetailProduks, route]);

    const onShare = async () => {
        const idProduk = route.params.idProduk;
        if (idProduk) {
            const encoded = base64.encode(idProduk.toString());
            try {
                const result = await Share.share({
                    message:
                        'https://mall38.com/product/data-produk/' + encoded,
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                alert(error.message);
            }
        } else {
            const idProdukDeep = route.params.idProdukDeep;
            try {
                const result = await Share.share({
                    message:
                        'https://mall38.com/product/data-produk/' + idProdukDeep,
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [handleBackButtonClick]);

    useEffect(() => {
        getDetailProduks();
        return () => {
            clearDetailProduks();
            yOffset.setValue(0);
        };
    }, [getDetailProduks, clearDetailProduks, yOffset]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Headers
                headerOpacity={headerOpacity}
                navigation={navigation}
                onShare={onShare}
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
                            detailProduk={detailProduk}
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
