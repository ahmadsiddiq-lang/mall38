/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProdukVer from '../CardProdukVer';

export default function ProdukList({
    navigation,
    dataProduk = [],
    filterProdukLokal,
    filterProdukImport,
    filterProdukMitra,

}) {

    const [indexOf, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const dataMenu = [
        {
            title: 'Produk Lokal',
            id: 1,
        },
        {
            title: 'Produk Import',
            id: 2,
        },
        {
            title: 'Produk Mitra',
            id: 3,
        },
    ];

    const handleLoading = () => {
        setLoading(false);
        const x = setTimeout(() => {
            setLoading(true);
            return () => {
                clearInterval(x);
            };
        }, 1000);
    };

    const handleData = (id) => {
        switch (id) {
            case 1:
                filterProdukLokal();
                handleLoading();
                break;
            case 2:
                filterProdukImport();
                handleLoading();
                break;
            case 3:
                filterProdukMitra();
                handleLoading();
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.Container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: sizeWidth(2.5),
                }}>
                    {
                        dataMenu.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        handleData(item.id);
                                        setIndex(index);
                                    }}
                                    key={index}
                                    style={[styles.BoxItemMenu,
                                    indexOf === index &&
                                    {
                                        backgroundColor: color.mainColor,
                                    },
                                    ]}>
                                    <Text style={[
                                        {
                                            fontSize: sizeFont(3.5),
                                        },
                                        indexOf === index ?
                                            {
                                                color: color.fontWhite,
                                            }
                                            :
                                            {
                                                color: color.mainColor,
                                            },
                                    ]}
                                    >{item.title}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.ContainerCard}>
                {
                    loading ?
                        dataProduk.length > 0 ?
                            dataProduk.slice(0, 16).map((item, index) => {
                                return (
                                    <View key={index} style={styles.BoxCard}>
                                        <CardProdukVer
                                            lableNew={true}
                                            lableRedy={true}
                                            navigation={navigation}
                                            item={item} />
                                    </View>
                                );
                            })
                            :
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(4),
                                    color: color.fontBlack1,
                                }}>Produk belum tersedia</Text>
                            </View>
                        :
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: sizeHeight(35),
                            width: SCREEN_WIDTH,
                        }}>
                            <ActivityIndicator size="large" color={color.mainColor} />
                        </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
        marginVertical: sizeHeight(0.5),
        paddingVertical: sizeHeight(1),
        // borderWidth: 1,
    },
    BoxLable: {
        overflow: 'hidden',
        width: sizeWidth(35),
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
    ContainerCard: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: sizeWidth(2.5),
        backgroundColor: color.bgWhite,
        marginTop: sizeHeight(1),
    },
    BoxCard: {
        width: (SCREEN_WIDTH / 2) - sizeWidth(2.5),
    },
    BoxItemMenu: {
        paddingHorizontal: sizeWidth(3),
        paddingVertical: sizeHeight(0.5),
        borderWidth: 2,
        borderColor: color.mainColor,
        borderRadius: 100,
        marginHorizontal: sizeWidth(2.5),
    },
});
