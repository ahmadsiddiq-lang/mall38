/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProduk from '../CardProduk';
import { DefaultTitle } from '../DefaultText';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CardEnd = ({ onPressLihatSemua }) => {
    return (
        <TouchableOpacity
            onPress={() => onPressLihatSemua && onPressLihatSemua()}
            activeOpacity={0.8}
            style={{
                width: sizeWidth(40),
                borderWidth: 1,
                borderColor: color.border2,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: sizeWidth(2.5),
            }}>
            <DefaultTitle>Lihat semua</DefaultTitle>
            <Ionicons name="chevron-forward" size={sizeFont(5)} />
        </TouchableOpacity>
    );
};

export default function ProdukImpor({ navigation, dataProduk }) {

    // console.log(dataProduk);

    return (
        <View style={styles.Container}>
            <View style={styles.Head}>
                <View style={styles.BoxLable}>
                    <Image
                        resizeMethod="auto"
                        style={styles.ImageLable} source={require('../../assets/images/banner/Produk-Import.png')} />
                </View>
                <Text
                    onPress={() => navigation.navigate('ListProduk', {
                        title: 'Produk Import',
                        dataProduk: dataProduk,
                    })}
                    style={{
                        color: color.mainColor,
                        fontSize: sizeFont(3.5),
                    }}>Lihat semua</Text>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                <View style={styles.ContainerProduk}>
                    {dataProduk &&
                        dataProduk.slice(20, 28).map((item, index) => {
                            return (
                                <View key={index}>
                                    <CardProduk
                                        lableNew={true}
                                        lableRedy={true}
                                        navigation={navigation}
                                        item={item} />
                                </View>
                            );
                        })}
                    <CardEnd
                        onPressLihatSemua={() => navigation.navigate('ListProduk', {
                            title: 'Produk Import',
                            dataProduk: dataProduk,
                        })}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginVertical: sizeHeight(0.5),
        paddingVertical: sizeHeight(1),
        backgroundColor: color.bgWhite,
    },
    BoxLable: {
        overflow: 'hidden',
        width: sizeWidth(40),
        height: sizeWidth(15),
        marginLeft: sizeWidth(5),
    },
    ImageLable: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    Head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: sizeWidth(5),
    },
    ContainerProduk: {
        flexDirection: 'row',
        marginHorizontal: sizeWidth(3),
        marginVertical: sizeHeight(2),
    },
});
