/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Carousel({ navigation }) {
    return (
        <View style={styles.Container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    marginHorizontal: sizeWidth(2.5),
                    flexDirection: 'row',
                }}>
                    {
                        [1, 2, 3].map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                style={styles.BoxImage}
                            >
                                <Image resizeMethod="auto" style={styles.Image} source={require('../../assets/images/banner/Banner1.png')} />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        height: sizeHeight(15),
        borderWidth: 1,
    },
    Image: {
        width: sizeWidth(90),
        height: sizeHeight(15),
    },
    BoxImage: {
        overflow: 'hidden',
        width: sizeWidth(90),
        height: sizeHeight(15),
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: sizeWidth(2.5),
    },
});
