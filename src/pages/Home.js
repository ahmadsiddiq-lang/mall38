import React, { useEffect, useCallback } from 'react';
import Axios from 'axios';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { BASE_URL } from '../config/URL';

export default function Home({ navigation }) {

    const dispatch = useDispatch();
    const dataCarousel = useSelector(state => state.Carousel.Carousel);
    const dataCategori = useSelector(state => state.categori.categori);

    const getCarousels = useCallback(async () => {
        dispatch(getCarousel());
    }, [dispatch]);

    const getCategoris = useCallback(async () => {
        dispatch(getCategori());
    }, [dispatch]);

    useEffect(() => {
        getCarousels();
        getCategoris();
    });

    return (
        <ScrollView style={styles.Container}>
            <View style={styles.BoxCarousel}>
                <Carousel dataCarousel={dataCarousel} />
            </View>
            <Categori navigation={navigation} dataCategori={dataCategori} />
            <FlashSale />
            <Spesial />
            <FavoritList />
        </ScrollView>
    );
}

export const HeaderHome = ({ navigation }) => {
    return <Header navigation={navigation} />;
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        // backgroundColor: color.bgWhite,
    },
    BoxCarousel: {
        paddingVertical: sizeHeight(2),
        backgroundColor: color.mainColor,
        paddingHorizontal: sizeWidth(3),
    },
});
