import React, { useEffect, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import { countDown } from '../config/function';
// import { countDown } from '../config/function';

export default function Home({ navigation }) {

    const dispatch = useDispatch();
    const dataCarousel = useSelector(state => state.Carousel.Carousel);
    const dataCategori = useSelector(state => state.categori.categori);
    const dataFlash = useSelector(state => state.flashsale.flashsale);
    const [dateFlashShale, setDateFlash] = useState('');

    // console.log(dataProduk);

    const getCarousels = useCallback(async () => {
        dispatch(getCarousel());
    }, [dispatch]);

    const getCategoris = useCallback(async () => {
        dispatch(getCategori());
    }, [dispatch]);

    const getFlash = useCallback(async () => {
        dispatch(getFlashSale());
    }, [dispatch]);


    useEffect(() => {
        getCarousels();
        getCategoris();
        getFlash();

        return () => {
            getCarousels();
            getCategoris();
            getFlash();
        };
    }, [getCarousels, getCategoris, getFlash]);

    useEffect(() => {
        // var countDownDate = new Date('Dec 17, 2020 21:37:25').getTime();
        var myDate = '07-12-2020';
        myDate = myDate.split('-');
        var countDownDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
        const x = setInterval(function () {
            const time = countDown(countDownDate.getTime());
            setDateFlash(time);
            if (time.distance < 0) {
                clearInterval(x);
            }
        }, 1000);
        return () => {
            clearInterval(x);
        };
    }, []);

    return (
        <ScrollView style={styles.Container}>
            <View style={styles.BoxCarousel}>
                <Carousel dataCarousel={dataCarousel} />
            </View>
            <Categori navigation={navigation} dataCategori={dataCategori} />
            <FlashSale dateFlashShale={dateFlashShale} navigation={navigation} dataFlash={dataFlash} />
            <Spesial />
            <FavoritList navigation={navigation} dataFlash={dataFlash} />
        </ScrollView>
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
