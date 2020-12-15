/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { DefaultTitle } from '../DefaultText';

export default function Spesial() {
    return (
        <View style={styles.Container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: sizeWidth(5),
                paddingVertical: sizeHeight(1),
            }}>
                <Text style={{
                    fontSize: sizeFont(4),
                    fontFamily: Poppins.MediumItalic,
                }}>Special</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <DefaultTitle>Lihat semua</DefaultTitle>
                </TouchableOpacity>
            </View>
            <Image resizeMethod="auto" style={styles.image} source={require('../../assets/images/banner/Spesial.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: color.bgWhite,
        paddingBottom: sizeHeight(2),
    },
    image: {
        width: SCREEN_WIDTH,
        height: sizeHeight(30),
    },
});
