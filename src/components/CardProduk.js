/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { DefaultTitle } from './DefaultText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { rupiah } from '../config/function';

export default function CardProduk({ item, navigation, onPressProduk, onPressBeli }) {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPressIn={() => navigation.navigate('DetailProduk', {
                    idProduk: item.id,
                })}
                activeOpacity={0.8}
            >
                <View style={styles.BoxImage}>
                    {
                        item !== undefined ?
                            <Image resizeMethod="auto" style={styles.image} source={{ uri: item.image }} />
                            :
                            <Image resizeMethod="auto" style={styles.image} source={require('../assets/images/Produk/imagedefault.png')} />
                    }
                </View>
                <View style={styles.BoxText}>
                    <DefaultTitle>{item && item.name}</DefaultTitle>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                    }}>{item && item.category.name}</Text>
                    <Text style={{
                        fontSize: sizeFont(3.8),
                        fontFamily: Poppins.Medium,
                    }}>Rp. {item && rupiah(item.price)}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPressBeli && onPressBeli()}
                activeOpacity={0.8}
                style={styles.BtnBeli}
            >
                <Text style={{
                    fontFamily: Poppins.Medium,
                    fontSize: sizeFont(3.5),
                    color: color.fontWhite,
                }}>BELI</Text>
            </TouchableOpacity>
        </View>
    );
}

export const CardEnd = ({ onPressLihatSemua }) => {
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

const styles = StyleSheet.create({
    Container: {
        borderWidth: 1,
        borderColor: color.border2,
        borderRadius: 8,
        marginHorizontal: sizeWidth(2.5),
        width: sizeWidth(40),
        flex: 1,
        paddingBottom: sizeHeight(5),
        overflow: 'hidden',
    },
    BoxImage: {
        // borderWidth: 1,
        width: sizeWidth(40),
        height: sizeWidth(25),
        overflow: 'hidden',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    image: {
        width: sizeWidth(40),
        height: sizeWidth(25),
    },
    BoxText: {
        paddingHorizontal: sizeWidth(1.5),
        paddingTop: sizeHeight(1),
    },
    BtnBeli: {
        backgroundColor: color.mainColor,
        alignItems: 'center',
        paddingVertical: sizeHeight(0.3),
        marginHorizontal: sizeWidth(2),
        marginVertical: sizeHeight(1),
        borderRadius: 8,
        position: 'absolute',
        bottom: 0,
        width: '90%',
    },
});
