/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { DefaultTitle } from './DefaultText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { rupiah } from '../config/function';

export default function CardProdukVer({ item, navigation, lableNew, lableRedy, onPressBeli }) {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('DetailProduk', {
                    idProduk: item.id,
                })}
            >
                <View style={styles.BoxImage}>
                    {
                        lableNew &&
                        <ImageBackground
                            source={require('../assets/images/Produk/Rectangle2.png')}
                            style={{
                                position: 'absolute',
                                right: 10,
                                width: sizeWidth(8),
                                height: sizeHeight(4),
                                zIndex: 1,
                                alignItems: 'center',
                            }}>
                            <Text style={{
                                fontSize: sizeFont(3),
                                color: color.fontWhite,
                                marginTop: sizeHeight(0.5),
                            }}>NEW</Text>
                        </ImageBackground>
                    }
                    {
                        item !== undefined ?
                            <Image resizeMethod="auto" style={styles.image} source={{ uri: item.image }} />
                            :
                            <Image resizeMethod="auto" style={styles.image} source={require('../assets/images/Produk/imagedefault.png')} />
                    }
                    {
                        lableRedy &&
                        <View style={{
                            width: '100%',
                            zIndex: 1,
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                        }}>
                            <Image
                                source={require('../assets/images/Produk/Rectangle1.png')}
                                style={{
                                    resizeMode: 'contain',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: sizeWidth(30),
                                    height: sizeHeight(3.5),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }} />
                            <Text style={{
                                fontSize: sizeFont(3),
                                color: color.fontWhite,
                                zIndex: 1,
                            }}>Redy to Order</Text>
                        </View>
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
                        color: color.mainColor,
                    }}>Rp. {item && rupiah(item.price)}</Text>
                </View>
            </TouchableOpacity>
            {
                onPressBeli &&
                <TouchableOpacity
                    onPress={() => onPressBeli(item)}
                    activeOpacity={0.8}
                    style={styles.BtnBeli}
                >
                    <Text style={{
                        fontFamily: Poppins.Medium,
                        fontSize: sizeFont(3.5),
                        color: color.fontWhite,
                    }}>BELI</Text>
                </TouchableOpacity>
            }
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
        borderWidth: 0.5,
        elevation: 2,
        backgroundColor: color.bgWhite,
        borderColor: color.border3,
        borderRadius: 8,
        marginHorizontal: sizeWidth(1),
        flex: 1,
        marginVertical: sizeHeight(1),
        // paddingBottom: sizeHeight(6),
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    BoxImage: {
        // borderWidth: 1,
        // width: sizeWidth(40),
        flex: 1,
        height: sizeWidth(45),
        overflow: 'hidden',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
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
        // position: 'absolute',
        // bottom: 0,
        // width: '90%',
    },
});
