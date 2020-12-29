/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ListMeodeBayar({ curentIndex, handlePilihMetodeBayar }) {
    const dataBank = [
        { name: 'BCA', bank: 'bca', image: require('../../assets/images/MetodeBayar/bca.png') },
        { name: 'BNI', bank: 'bni', image: require('../../assets/images/MetodeBayar/bni.png') },
        { name: 'BRI', bank: 'bri', image: require('../../assets/images/MetodeBayar/bri.png') },
        // { name: 'MANDIRI', bank: 'mandiri', image: require('../../assets/images/MetodeBayar/mandiri.png') },
    ];


    return (
        <View>
            <Text style={{
                fontSize: sizeFont(4),
                fontFamily: Poppins.Medium,
                marginLeft: sizeWidth(5),
                marginVertical: sizeHeight(3),
            }}>Metode Bayar</Text>
            <View style={styles.Content}>
                <View style={{
                    paddingHorizontal: sizeWidth(5),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                    }}>Transfer Bank</Text>
                    {
                        dataBank.map((item, index) => {
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
                                            }}>Bank {item.name}</Text>
                                        </View>
                                    </View>
                                    {
                                        curentIndex === index ?
                                            <Ionicons
                                                name="radio-button-on"
                                                size={sizeFont(5.5)}
                                                color={color.mainColor}
                                            />
                                            :
                                            <Ionicons
                                                name="radio-button-off"
                                                size={sizeFont(5.5)}
                                                color={color.mainColor}
                                            />
                                    }
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Content: {

    },
});
