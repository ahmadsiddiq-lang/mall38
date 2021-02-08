/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ListMeodeBayar({ curentIndex, handlePilihMetodeBayar }) {
    const dataBank = [
        {
            title: 'Virtual Account',
            metode_bayar:
                [
                    { name: 'Bank BCA', bank: 'bca', image: require('../../assets/images/MetodeBayar/bca.png') },
                    { name: 'Bank BNI', bank: 'bni', image: require('../../assets/images/MetodeBayar/bni.png') },
                    { name: 'Bank BRI', bank: 'bri', image: require('../../assets/images/MetodeBayar/bri.png') },
                ],
        },
        {
            title: 'E-Money',
            metode_bayar:
                [
                    { name: 'GOPAY', bank: 'gopay', image: require('../../assets/images/MetodeBayar/gopay.png') },
                ],
        },
        {
            title: 'Convenience Store',
            metode_bayar:
                [
                    { name: 'Indomaret', bank: 'indomaret', image: require('../../assets/images/MetodeBayar/indomaret.png') },
                    { name: 'Alfamart', bank: 'alfamart', image: require('../../assets/images/MetodeBayar/alfamart.png') },
                ],
        },
        // {
        //     title: 'Credit Card',
        //     metode_bayar:
        //         [
        //             { name: 'Credit Card', bank: 'indomaret', image: require('../../assets/images/MetodeBayar/credit.png') },
        //         ],
        // },
    ];


    return (
        <View style={styles.Container}>
            <Text style={{
                fontSize: sizeFont(4),
                fontFamily: Poppins.Medium,
                marginLeft: sizeWidth(5),
                marginVertical: sizeHeight(3),
            }}>Metode Bayar</Text>
            <ScrollView>
                <View style={{ flex: 1, marginBottom: sizeHeight(10) }}>
                    {
                        dataBank.map((title, indextitle) => {
                            return (
                                <View key={indextitle} style={{
                                    paddingHorizontal: sizeWidth(5),
                                }}>
                                    <Text style={{
                                        fontSize: sizeFont(3.5),
                                        fontFamily: Poppins.Medium,
                                    }}>{title.title}</Text>
                                    {
                                        title.metode_bayar.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => handlePilihMetodeBayar(item, index)}
                                                    activeOpacity={0.8}
                                                    key={index}
                                                    style={{
                                                        marginTop: sizeHeight(1.5),
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        marginBottom: sizeHeight(2),
                                                        marginLeft: sizeWidth(3),
                                                    }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Image
                                                            // resizeMethod="auto"
                                                            style={{
                                                                resizeMode: 'contain',
                                                                width: sizeWidth(15),
                                                                height: sizeWidth(10),
                                                            }}
                                                            source={item.image} />
                                                        <View style={{
                                                            marginLeft: sizeWidth(4),
                                                        }}>
                                                            <Text style={{
                                                                fontSize: sizeFont(3.5),
                                                            }}>{item.name}</Text>
                                                        </View>
                                                    </View>
                                                    <Ionicons
                                                        name="chevron-forward"
                                                        size={sizeFont(4)}
                                                        color={color.mainColor}
                                                    />
                                                </TouchableOpacity>
                                            );
                                        })
                                    }
                                </View>

                            );
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
