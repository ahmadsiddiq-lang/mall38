import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Animated, RefreshControl, StatusBar, StyleSheet, View } from 'react-native';
import { SCREEN_WIDTH, sizeHeight } from '../assets/responsive';
import Header from '../components/Header/Home';
import Carousel from '../components/Home/Carousel';
// import Categori from '../components/Home/Categori';
// import Kemitraan from '../components/Home/Kemitraan';
import { useDispatch, useSelector } from 'react-redux';
import { getCarousel } from '../redux/actions/Carousel';
import { getCategori } from '../redux/actions/Categori';
import { getProduk } from '../redux/actions/Produk';
import { getIdUser } from '../config/function';
import { getCArt } from '../redux/actions/Cart';
import { getDataUser } from '../redux/actions/User';
import PromoMenarik from '../components/Home/PromoMenarik';
// import ProdukLokal from '../components/Home/ProdukLokal';
// import ProdukImpor from '../components/Home/ProdukImpor';
import BannerCategori from '../components/Home/BannerCategori';
import ProdukBaru from '../components/Home/ProdukBaru';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { color } from '../assets/colors/Index';
import SpesialProduk from '../components/Home/SpesialProduk';
import ProdukList from '../components/Home/ProdukList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import { countDown } from '../config/function';

export default function Home({ navigation }) {


    const dispatch = useDispatch();

    const dataCarousel = useSelector(state => state.Carousel.Carousel);
    const dataCategori = useSelector(state => state.categori.categori);
    const dataProduk = useSelector(state => state.produk.produk);
    // const [produkMitra, setProdukMitra] = useState(null);
    // const [produkLokal, setProdukLokal] = useState(null);
    // const [produkImport, setProdukImport] = useState(null);
    const [produkList, setProdukList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    // shimer
    // const [visibleCategori, setVisibleCategori] = useState(false);
    // const CategoriShemer = React.createRef();
    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
    const [visible, setVisibleBanner] = useState(false);
    const [visibleProduk, setVisible] = useState(false);
    const CarouselUp = React.createRef();
    const ProdukBaruShimerRef = React.createRef();

    const yOffset = useRef(new Animated.Value(0)).current;
    const headerOpacity = yOffset.interpolate({
        inputRange: [0, 200],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    // console.log(dataProduk);

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
        dispatch(getCarousel(setVisibleBanner));
        dispatch(getProduk(setVisible));
        dispatch(getCategori());
        dispatch(getDataUser(idUser));
    }, [dispatch]);

    const hetDataCart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getCArt(idUser));
        }
    }, [dispatch]);

    const filterProdukMitra = useCallback(() => {
        if (dataProduk) {
            const data = dataProduk.filter(item => item.mitra === 1);
            setProdukList(data);
        }
    }, [dataProduk]);

    const filterProdukLokal = useCallback(() => {
        if (dataProduk) {
            const data = dataProduk.filter(item => item.product_type === 'Lokal');
            // console.log(data);
            setProdukList(data);
        }
    }, [dataProduk]);

    const filterProdukImport = useCallback(() => {
        if (dataProduk) {
            const data = dataProduk.filter(item => item.product_type === 'Import');
            // console.log(data);
            setProdukList(data);
        }
    }, [dataProduk]);

    const handleSearch = useCallback((search = '') => {
        const data = dataProduk.filter(item => {
            if (item.name !== undefined && search.length > 0) {
                return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            }
        });
        // console.log(data);
        const newData = data.length > 0 ? data : null;
        return newData;
    }, [dataProduk]);


    useEffect(() => {
        getData();
        hetDataCart();
        return () => {
            getData();
            hetDataCart();
        };
    }, [getData, hetDataCart]);

    useEffect(() => {
        filterProdukLokal();
        return () => {
            setProdukList(null);
        };
    }, [filterProdukMitra, filterProdukLokal, filterProdukImport]);


    React.useEffect(() => {
        const facebookAnimated = Animated.stagger(400, [CarouselUp.current.getAnimated(),
            // Animated.parallel([
            //     ProdukBaruShimerRef.current.getAnimated(),
            // ]),
        ]);
        Animated.loop(facebookAnimated).start();
    }, [CarouselUp, ProdukBaruShimerRef]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
            {
                visible &&
                <View style={styles.BoxHedaer}>
                    <Header navigation={navigation} headerOpacity={headerOpacity} />
                </View>
            }
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
                        progressViewOffset={sizeHeight(10)}
                        colors={['#689F38', color.mainColor]}
                        refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <ShimmerPlaceHolder
                    ref={CarouselUp}
                    visible={visible}
                    style={styles.BoxCarousel}
                >
                    <Carousel dataCarousel={dataCarousel} />
                </ShimmerPlaceHolder>
                <ProdukBaru
                    ShimmerPlaceHolder={ShimmerPlaceHolder}
                    visibleProduk={visibleProduk}
                    ProdukBaruShimerRef={ProdukBaruShimerRef}
                    navigation={navigation}
                    dataProduk={dataProduk} />
                <SpesialProduk
                    handleSearch={handleSearch}
                    visibleProduk={visibleProduk}
                    ShimmerPlaceHolder={ShimmerPlaceHolder}
                    ProdukBaruShimerRef={ProdukBaruShimerRef}
                    navigation={navigation} />
                {/* <Kemitraan
                    navigation={navigation}
                    produkMitra={produkMitra}
                    barStatus={'80%'}
                    FlashSaleShimer={ProdukBaruShimerRef}
                    visibleFlashSale={visibleProduk}
                    ShimmerPlaceHolder={ShimmerPlaceHolder}
                /> */}
                {
                    visibleProduk &&
                    <>
                        <BannerCategori navigation={navigation} dataCategori={dataCategori} />
                        <PromoMenarik
                            navigation={navigation}
                            dataCarousel={dataCarousel}
                            ShimmerPlaceHolder={ShimmerPlaceHolder}
                            visible={visible}
                            CarouselUp={CarouselUp}
                        />
                        <ProdukList
                            filterProdukMitra={filterProdukMitra}
                            filterProdukImport={filterProdukImport}
                            filterProdukLokal={filterProdukLokal}
                            navigation={navigation}
                            dataProduk={produkList} />
                        {/* <ProdukImpor navigation={navigation} dataProduk={produkImport} /> */}
                        {/* <ProdukBaru navigation={navigation} dataProduk={dataProduk} /> */}
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
        width: SCREEN_WIDTH,
        height: hp(35),
    },
});
