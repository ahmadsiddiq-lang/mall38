/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProduk, { CardEnd } from '../CardProduk';
import { DefaultText } from '../DefaultText';


export default function FavoritList({ dataFlash, navigation }) {

    // const [dataProduk, setDataProduk] = useState([1, 2, 3, 4, 5]);

    return (
        <View style={styles.Container}>
            <View style={{
                paddingVertical: sizeHeight(1),
                paddingHorizontal: sizeWidth(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    fontSize: sizeFont(4),
                    fontFamily: Poppins.MediumItalic,
                }}>Favorit</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <DefaultText>Lihat semua</DefaultText>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: sizeWidth(2.5),
                }}>
                    {
                        dataFlash &&
                        dataFlash.slice(0, 4).map((item, index) => (
                            <View key={index}>
                                <CardProduk item={item} />
                            </View>
                        ))
                    }
                    <CardEnd />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        marginTop: sizeHeight(1.5),
        backgroundColor: color.bgWhite,
        paddingBottom: sizeHeight(5),
    },
});
