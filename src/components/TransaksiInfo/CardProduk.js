/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function CardProduk() {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                style={styles.ListProduk}
                activeOpacity={0.8}
            >
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    borderBottomWidth: 0.5,
                    borderBottomColor: color.border1,
                    paddingBottom: sizeHeight(1),
                }}>
                    <View style={styles.BoxImage}>
                        <Image
                            resizeMethod="auto"
                            style={{
                                resizeMode: 'contain',
                                width: '100%',
                                height: '100%',
                            }}
                            source={require('../../assets/images/Produk/tas.png')} />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingHorizontal: sizeWidth(3),
                    }}>
                        <Text numberOfLines={1} style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                        }}>Tas Wanita</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3),
                                color: color.fontBlack1,
                            }}>Status:</Text>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                                fontFamily: Poppins.Medium,
                                color: color.mainColor,
                            }}> Pending</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack1,
                            }}>tas wanita</Text>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack1,
                            }}>x1</Text>
                        </View>
                        <Text style={{
                            textAlign: 'right',
                            fontSize: sizeFont(3.3),
                            color: color.mainColor,
                        }}>Rp. 200.000</Text>
                    </View>
                </View>
                <View style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: color.border1,
                    alignItems: 'center',
                    paddingVertical: sizeHeight(0.8),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                    }}>Tampilkan Produk</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: sizeWidth(3),
                    paddingVertical: sizeHeight(0.8),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                    }}>2 produk</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                    }}>Total Pesanan :
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                            color: color.mainColor,
                        }}>  Rp. 300.000</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        marginVertical: sizeHeight(1),
    },
    ListProduk: {
        borderBottomWidth: 0.5,
        borderBottomColor: color.border1,
    },
    BoxImage: {
        width: sizeWidth(20),
        height: sizeWidth(20),
    },
});
