/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function SpesialProduk({
    visibleProduk,
    ShimmerPlaceHolder,
    handleSearch,
    navigation,
}) {

    // const visibleProduk = false;

    const dataCategori = [
        {
            image: require('../../assets/images/banner/Mukena.png'),
            title: 'Mukena',
        },
        {
            image: require('../../assets/images/banner/Hijab.png'),
            title: 'Hijab',
        },
        {
            image: require('../../assets/images/banner/Tas.png'),
            title: 'Tas',
        },
        {
            image: require('../../assets/images/banner/Sepatu.png'),
            title: 'Sepatu',
        },
    ];

    const ComponentShimer = () => {
        return (
            <View style={{
                width: SCREEN_WIDTH,
                height: sizeHeight(30),
                marginTop: sizeHeight(1),
                flexDirection: 'row',
            }}>
                <ShimmerPlaceHolder
                    visible={visibleProduk}
                    style={{
                        width: '40%',
                        height: '100%',
                    }}
                />
                <View style={{
                    width: '60%',
                    height: '100%',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}>
                    {
                        [1, 2, 3, 4].map((_, index) => {
                            return (
                                <View key={index} style={styles.BoxItem}>
                                    <View style={styles.BoxImage}>
                                        <ShimmerPlaceHolder
                                            visible={visibleProduk}
                                            style={{
                                                width: sizeWidth(15),
                                                height: sizeWidth(15),
                                                borderRadius: 100,
                                                marginTop: sizeHeight(2),
                                            }}
                                        />
                                        <ShimmerPlaceHolder
                                            visible={visibleProduk}
                                            style={{
                                                borderRadius: 30,
                                                width: '70%',
                                                height: '10%',
                                                marginTop: sizeHeight(2),
                                            }}
                                        />
                                    </View>
                                </View>
                            );
                        })
                    }
                </View>
            </View>
        );
    };

    return (
        <View style={styles.Container}>
            {
                visibleProduk &&
                <Text style={{
                    fontSize: sizeFont(4),
                    fontFamily: Poppins.Medium,
                    marginLeft: sizeWidth(5),
                }}>Produk Spesial</Text>
            }
            {
                visibleProduk ?
                    <ImageBackground
                        resizeMethod="auto"
                        source={require('../../assets/images/banner/Banner-Produk-Spesial.png')}
                        style={{
                            width: SCREEN_WIDTH,
                            height: 230,
                            alignItems: 'flex-end',
                            marginTop: sizeHeight(1),
                        }}
                    >
                        <View style={{
                            width: '61.5%',
                            height: '100%',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}>
                            {
                                dataCategori.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('ListProduk', {
                                                    title: 'Produk Spesial',
                                                    dataProduk: handleSearch(item.title),
                                                });
                                            }}
                                            key={index}
                                            activeOpacity={0.8}
                                            style={styles.BoxItem}
                                        >
                                            <View style={styles.BoxImage}>
                                                <Image
                                                    resizeMethod="auto"
                                                    source={item.image}
                                                    style={styles.Image}
                                                />
                                            </View>
                                            <View style={{
                                                backgroundColor: color.mainColor,
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{
                                                    fontSize: sizeFont(3.5),
                                                    color: color.fontWhite,
                                                }}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                    </ImageBackground>
                    :
                    <ComponentShimer />
            }
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
    BoxItem: {
        width: '50%',
        height: '50.5%',
    },
    BoxImage: {
        // flex: 1,
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Image: {
        resizeMode: 'contain',
        width: '70%',
        height: '70%',
    },
});
