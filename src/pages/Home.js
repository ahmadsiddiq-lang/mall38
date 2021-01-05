/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Animated, RefreshControl, StatusBar, StyleSheet, View } from 'react-native';
import { SCREEN_WIDTH, sizeHeight } from '../assets/responsive';
import Header from '../components/Header/Home';
import Carousel from '../components/Home/Carousel';
// import Categori from '../components/Home/Categori';
import FlashSale from '../components/Home/FlashSale';
import { useDispatch, useSelector } from 'react-redux';
import { getCarousel } from '../redux/actions/Carousel';
import { getCategori } from '../redux/actions/Categori';
import { getFlashSale } from '../redux/actions/FlashSale';
import { countDown, getIdUser } from '../config/function';
import { getCArt } from '../redux/actions/Cart';
import { getDataUser } from '../redux/actions/User';
import PromoMenarik from '../components/Home/PromoMenarik';
import ProdukLokal from '../components/Home/ProdukLokal';
import ProdukImpor from '../components/Home/ProdukImpor';
import BannerCategori from '../components/Home/BannerCategori';
import ProdukBaru from '../components/Home/ProdukBaru';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { color } from '../assets/colors/Index';

// import { countDown } from '../config/function';

export default function Home({ navigation }) {


    const dispatch = useDispatch();

    const dataCarousel = useSelector(state => state.Carousel.Carousel);
    const dataCategori = useSelector(state => state.categori.categori);
    const dataFlash = useSelector(state => state.flashsale.flashsale);
    const [dateFlashShale, setDateFlash] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    // shimer
    // const [visibleCategori, setVisibleCategori] = useState(false);
    // const CategoriShemer = React.createRef();
    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
    const [visible, setVisible] = useState(false);
    const [visibleFlashSale, setvisibleFlashSale] = useState(false);
    const CarouselUp = React.createRef();
    const FlashSaleShimer = React.createRef();

    const yOffset = useRef(new Animated.Value(0)).current;
    const headerOpacity = yOffset.interpolate({
        inputRange: [0, 200],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const wait = useCallback((timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            getData();
            setRefreshing(false);
        });
    }, [wait, getData]);

    const getData = useCallback(async () => {
        const idUser = await getIdUser();
        dispatch(getCarousel(setVisible));
        dispatch(getFlashSale(setvisibleFlashSale));
        dispatch(getCategori());
        dispatch(getDataUser(idUser));
    }, [dispatch]);

    const hetDataCart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getCArt(idUser));
        }
    }, [dispatch]);


    useEffect(() => {
        getData();
        hetDataCart();
    }, [getData, hetDataCart]);

    React.useEffect(() => {
        const facebookAnimated = Animated.stagger(400, [CarouselUp.current.getAnimated(),
            // Animated.parallel([
            //     CarouselUp.current.getAnimated(),
            // ])
        ]);
        Animated.loop(facebookAnimated).start();
    }, [CarouselUp]);

    // useEffect(() => {
    //     var countDownDate = new Date('Dec 30, 2020 00:00:25').getTime();
    //     // var myDate = '20-12-2020';
    //     // myDate = myDate.split('-');
    //     // var countDownDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    //     const x = setInterval(function () {
    //         const time = countDown(countDownDate);
    //         setDateFlash(time);
    //         if (time.distance < 0) {
    //             clearInterval(x);
    //         }
    //     }, 1000);
    //     return () => {
    //         clearInterval(x);
    //     };
    // }, []);


    return (
        <View style={styles.Container}>
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
            <View style={styles.BoxHedaer}>
                <Header navigation={navigation} headerOpacity={headerOpacity} />
            </View>
            <Animated.ScrollView
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
                refreshControl={
                    <RefreshControl
                        style={{
                            zIndex: 999,
                            marginTop: sizeHeight(15),
                        }}
                        colors={['#689F38', color.mainColor]}
                        refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <ShimmerPlaceHolder
                    ref={CarouselUp}
                    visible={visible}
                    style={{
                        width: SCREEN_WIDTH,
                        height: sizeHeight(39),
                    }}
                >
                    <View style={styles.BoxCarousel}>
                        <Carousel dataCarousel={dataCarousel} />
                    </View>
                </ShimmerPlaceHolder>
                {/* <Categori
                    navigation={navigation}
                    dataCategori={dataCategori}
                    ShimmerPlaceHolder={ShimmerPlaceHolder}
                    visibleCategori={visibleCategori}
                    CategoriShemer={CategoriShemer}
                /> */}
                <FlashSale
                    dateFlashShale={dateFlashShale}
                    navigation={navigation}
                    dataFlash={dataFlash}
                    barStatus={'80%'}
                    FlashSaleShimer={FlashSaleShimer}
                    visibleFlashSale={visibleFlashSale}
                    ShimmerPlaceHolder={ShimmerPlaceHolder}
                />
                <PromoMenarik
                    navigation={navigation}
                    dataCarousel={dataCarousel}
                    ShimmerPlaceHolder={ShimmerPlaceHolder}
                    visible={visible}
                    CarouselUp={CarouselUp}
                />
                {
                    visibleFlashSale &&
                    <>
                        <ProdukLokal navigation={navigation} dataProduk={dataFlash} />
                        <ProdukImpor navigation={navigation} dataProduk={dataFlash} />
                        <BannerCategori navigation={navigation} dataCategori={dataCategori} />
                        <ProdukBaru navigation={navigation} dataProduk={dataFlash} />
                    </>
                }
            </Animated.ScrollView>
        </View>
    );
}

export const HeaderHome = ({ navigation }) => {
    return <Header navigation={navigation} />;
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    BoxHedaer: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 0,
        zIndex: 1,
    },
    BoxCarousel: {
        // backgroundColor: color.mainColor,
    },
});
