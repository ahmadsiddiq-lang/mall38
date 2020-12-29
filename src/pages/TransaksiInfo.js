import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../assets/responsive';
import Headers from '../components/Header/Headers';
import CardProduk from '../components/TransaksiInfo/CardProduk';
import TopBar from '../components/TransaksiInfo/TopBar';

export default function Transaksi({ navigation }) {



    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={'Pesanan Saya'} />
            <TopBar />
            <ScrollView>
                <View style={styles.Content}>
                    <CardProduk />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    Content: {
        paddingHorizontal: sizeWidth(5),
        marginVertical: sizeHeight(2),
    },
});
