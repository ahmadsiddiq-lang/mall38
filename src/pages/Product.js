/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import ListProduk from '../components/Produk/ListProduk';
import { getProduk } from '../redux/actions/Produk';
import Header from '../components/Header/Home';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Categori from '../components/Produk/Categori';
import { SCREEN_WIDTH, sizeHeight, sizeWidth } from '../assets/responsive';
import { clearData, getProdukCategori } from '../redux/actions/ProdukCategori';

export default function Product({ navigation }) {
    const dispatch = useDispatch();

    const dataProdukAll = useSelector(state => state.produk.produk);
    const dataCategori = useSelector(state => state.categori.categori);

    const dataProduk = dataProdukAll;
    const [refreshing, setRefreshing] = React.useState(false);
    const [bannerCategry, setBanner] = useState(null);

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
            <Categori
                navigation={navigation}
                setBanner={setBanner}
                // handleCategori={handleCategori}
                dataCategori={dataCategori} />
            {
                bannerCategry !== null &&
                <View style={{
                    width: SCREEN_WIDTH,
                    height: sizeHeight(15),
                    paddingHorizontal: sizeWidth(5),
                }}>
                    <Image
                        resizeMethod="auto"
                        source={{ uri: bannerCategry }}
                        style={{
                            resizeMode: 'contain',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>
            }
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
