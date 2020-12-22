import React, { useEffect, useCallback, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../assets/responsive';
import Header from '../components/Header/Home';
import Carousel from '../components/Home/Carousel';
import Categori from '../components/Home/Categori';
import FavoritList from '../components/Home/FavoritList';
import FlashSale from '../components/Home/FlashSale';
import Spesial from '../components/Home/Spesial';
import { useDispatch, useSelector } from 'react-redux';
import { getCarousel } from '../redux/actions/Carousel';
import { getCategori } from '../redux/actions/Categori';
import { getFlashSale } from '../redux/actions/FlashSale';
import { countDown, getIdUser } from '../config/function';
import { getCArt } from '../redux/actions/Cart';
import { getDataUser } from '../redux/actions/User';
// import { countDown } from '../config/function';

export default function Home({ navigation }) {

    const dispatch = useDispatch();
    const dataCarousel = useSelector(state => state.Carousel.Carousel);
    const dataCategori = useSelector(state => state.categori.categori);
    const dataFlash = useSelector(state => state.flashsale.flashsale);
    const [dateFlashShale, setDateFlash] = useState('');

    const getCarousels = useCallback(async () => {
        const idUser = await getIdUser();
        dispatch(getCarousel());
        dispatch(getCategori());
        dispatch(getFlashSale());
        dispatch(getDataUser(idUser));
    }, [dispatch]);

    // const getCategoris = useCallback(async () => {
    //     dispatch(getCategori());
    // }, [dispatch]);

    // const getFlash = useCallback(async () => {
    //     dispatch(getFlashSale());
    // }, [dispatch]);

    const hetDataCart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getCArt(idUser));
        }
    }, [dispatch]);


    useEffect(() => {
        getCarousels();
        hetDataCart();
        // getCategoris();
        // getFlash();
    }, [getCarousels, hetDataCart]);

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
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <Header navigation={navigation} />
            <ScrollView style={styles.Container}>
                <View style={styles.BoxCarousel}>
                    <Carousel dataCarousel={dataCarousel} />
                </View>
                <Categori navigation={navigation} dataCategori={dataCategori} />
                {/* <FavoritList navigation={navigation} dataFlash={dataFlash} /> */}
                {/* <Spesial /> */}
                {/* <FlashSale dateFlashShale={dateFlashShale} navigation={navigation} dataFlash={dataFlash} /> */}
            </ScrollView>
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
    BoxCarousel: {
        paddingVertical: sizeHeight(2),
        backgroundColor: color.mainColor,
        paddingHorizontal: sizeWidth(3),
    },
});
