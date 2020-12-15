import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeHeight } from '../assets/responsive';
import Header from '../components/Header/Home';
import Carousel from '../components/Home/Carousel';
import Categori from '../components/Home/Categori';
import FlashSale from '../components/Home/FlashSale';


export default function Home() {
    return (
        <ScrollView style={styles.Container}>
            <View style={styles.BoxCarousel}>
                <Carousel />
            </View>
            <Categori />
            <FlashSale />
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
    },
});
