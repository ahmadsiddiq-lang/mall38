/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { Poppins } from '../../assets/fonts';
import { color } from '../../assets/colors/Index';
import CardProduk, { CardEnd } from '../CardProduk';


export default function FlashSale({ navigation, dataFlash, dateFlashShale }) {

    const renderItem = (item, index) => {
        return (
            <View
                key={index}
                style={styles.CardProduk}
            >
                <CardProduk item={item} />
            </View>
        );
    };
    return (
        <View
            style={styles.Container}
        >
            <View style={styles.Content}>
                <View style={{
                    paddingHorizontal: sizeWidth(5),
                    // marginVertical: sizeHeight(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: color.mainColor,
                }}>
                    <Text style={{
                        fontSize: sizeFont(4),
                        fontFamily: Poppins.MediumItalic,
                        color: color.fontWhite,
                    }}>Flash Sale</Text>
                    {/* <Text style={{
                        fontSize: sizeFont(3.5),
                        color: color.fontBlack,
                    }}>Lihat semua</Text> */}
                    {
                        dateFlashShale ?
                            <View style={styles.BoxTime}>
                                <View style={styles.BoxItemTime}>
                                    <Text style={styles.TextTime}>{dateFlashShale.hours}</Text>
                                </View>
                                <Text style={styles.TextTime}>:</Text>
                                <View style={styles.BoxItemTime}>
                                    <Text style={styles.TextTime}>{dateFlashShale.minutes}</Text>
                                </View>
                                <Text style={styles.TextTime}>:</Text>
                                <View style={styles.BoxItemTime}>
                                    <Text style={styles.TextTime}>{dateFlashShale.seconds}</Text>
                                </View>
                            </View>
                            :
                            <View style={styles.BoxTime}>
                                <View style={styles.BoxItemTime}>
                                    <Text style={styles.TextTime}>00</Text>
                                </View>
                                <Text style={styles.TextTime}>:</Text>
                                <View style={styles.BoxItemTime}>
                                    <Text style={styles.TextTime}>00</Text>
                                </View>
                                <Text style={styles.TextTime}>:</Text>
                                <View style={styles.BoxItemTime}>
                                    <Text style={styles.TextTime}>00</Text>
                                </View>
                            </View>

                    }
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    <View style={styles.ContainerProduk}>
                        {dataFlash &&
                            dataFlash.slice(0, 3).map(renderItem)}
                        <CardEnd />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        // padding: sizeWidth(5),
        marginVertical: sizeHeight(1.5),
    },
    Content: {
        backgroundColor: color.bgWhite,
    },
    BoxTime: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: color.bgBlack3,
        borderRadius: 8,
        paddingHorizontal: sizeWidth(4),
        paddingVertical: sizeWidth(1.5),
        marginLeft: sizeWidth(3),
    },
    BoxItemTime: {
        // borderWidth: 1,
        backgroundColor: color.bgWhite,
        paddingHorizontal: sizeWidth(2),
        borderRadius: 5,
    },
    TextTime: {
        fontSize: sizeFont(3.3),
        fontFamily: Poppins.Bold,
    },
    ContainerProduk: {
        flexDirection: 'row',
        marginHorizontal: sizeWidth(2),
        marginVertical: sizeHeight(2),
    },
});
