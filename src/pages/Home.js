import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../assets/colors/Index';
import Header from '../components/Header/Home';
import Carousel from '../components/Home/Carousel';
export default function Home() {
    return (
        <View style={styles.Container}>
            <View>
                <Carousel />
            </View>
        </View>
    );
}

export const HeaderHome = ({ navigation }) => {
    return <Header navigation={navigation} />;
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
});
