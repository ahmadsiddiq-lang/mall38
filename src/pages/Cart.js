import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Deskripsi from '../components/Cart/Deskripsi';
import Kurir from '../components/Cart/Kurir';
import ListProduk from '../components/Cart/ListProduk';
import MetodeBayar from '../components/Cart/MetodeBayar';
import HeaderCart from '../components/Header/HeaderCart';

export default function Cart({ navigation }) {
    return (
        <View style={styles.Container}>
            <HeaderCart navigation={navigation} />
            <StatusBar backgroundColor={color.bgWhite} barStyle="dark-content" />
            <Text style={{
                fontSize: sizeFont(5),
                paddingLeft: sizeWidth(5),
                fontFamily: Poppins.ExtraBold,
                color: color.mainColor,
            }}>My Cart</Text>
            <ScrollView>
                <View style={styles.Content}>
                    {
                        [1, 2, 3].map((_, index) => {
                            return (
                                <View key={index} style={styles.BoxCard}>
                                    <ListProduk />
                                </View>
                            );
                        })
                    }
                    <View style={{
                        marginTop: sizeHeight(4),
                    }}>
                        {/* <Kurir />
                        <MetodeBayar /> */}
                    </View>
                </View>
            </ScrollView>
            <Deskripsi />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    Content: {
        flex: 1,
        paddingTop: sizeHeight(1),
        paddingHorizontal: sizeWidth(5),
        paddingBottom: sizeHeight(28),
    },
    BoxCard: {
        marginVertical: sizeHeight(1.2),
    },
});
