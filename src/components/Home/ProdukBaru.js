/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProduk from '../CardProduk';
import { DefaultTitle } from '../DefaultText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

export default function ProdukLokal({ navigation, dataProduk, ProdukBaruShimerRef, visibleProduk }) {

    const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // const visibleProduk = false;
    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

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


    const renderItemShimer = (_, index) => {
        return (
            <View
                key={index}
                style={styles.CardProduk}
            >
                <View
                    ref={ProdukBaruShimerRef}
                    style={{
                        borderWidth: 1,
                        borderColor: color.border2,
                        borderRadius: 8,
                        marginHorizontal: sizeWidth(2.5),
                        width: sizeWidth(40),
                        height: sizeHeight(25),
                        flex: 1,
                        overflow: 'hidden',
                        marginTop: sizeHeight(1),
                    }}
                >
                    <View style={{
                        alignItems: 'center',
                        padding: sizeWidth(2),
                    }}>
                        <ShimmerPlaceHolder
                            style={{
                                width: sizeWidth(25),
                                height: sizeWidth(25),
                                borderRadius: 100,
                            }}
                        />
                        <ShimmerPlaceHolder
                            style={{
                                width: sizeWidth(35),
                                height: sizeWidth(3),
                                borderRadius: 100,
                                marginTop: sizeHeight(2),
                            }}
                        />
                        <ShimmerPlaceHolder
                            style={{
                                width: sizeWidth(35),
                                height: sizeWidth(3),
                                borderRadius: 100,
                                marginTop: sizeHeight(2),
                            }}
                        />
                        <ShimmerPlaceHolder
                            style={{
                                width: sizeWidth(35),
                                height: sizeWidth(3),
                                borderRadius: 100,
                                marginTop: sizeHeight(2),
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.Container}>
            <View style={styles.Head}>
                <ShimmerPlaceHolder
                    visible={visibleProduk}
                    style={[styles.BoxLable, {
                        borderRadius: 100,
                        flex: 1,
                        marginRight: sizeWidth(5),
                    }]}>
                    <Text style={{
                        fontSize: sizeFont(4),
                        fontFamily: Poppins.Medium,
                    }}>Produk Baru</Text>
                </ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                    style={{
                        borderRadius: 100,
                        flex: 1,
                        alignItems: 'flex-end',
                    }}
                    visible={visibleProduk}>
                    <Text
                        onPress={() => navigation.navigate('ListProduk', {
                            title: 'Produk Baru',
                            dataProduk: dataProduk,
                        })}
                        style={{
                            color: color.mainColor,
                            fontSize: sizeFont(3.5),
                        }}>Lihat semua</Text>
                </ShimmerPlaceHolder>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                <View style={styles.ContainerProduk}>
                    {dataProduk != null &&
                        visibleProduk ?
                        <>
                            {
                                dataProduk.slice(10, 18).map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <CardProduk
                                                lableNew={true}
                                                lableRedy={true}
                                                navigation={navigation}
                                                item={item} />
                                        </View>
                                    );
                                })
                            }
                            <CardEnd
                                onPressLihatSemua={() => navigation.navigate('ListProduk', {
                                    title: 'Produk Baru',
                                    dataProduk: dataProduk,
                                })}
                            />
                        </>
                        : fakeData.map(renderItemShimer)
                    }
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
        marginVertical: sizeHeight(0.5),
        marginTop: sizeHeight(1),
    },
});
