import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { sizeWidth } from '../assets/responsive';

export default function CarouselStandar() {
    return (
        <View style={styles.Container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.Content}>
                    {
                        [1, 2, 3, 4].map((item, index) => {
                            return (
                                <View key={index} style={styles.BoxImage}>
                                    <Image resizeMethod="auto"
                                        style={styles.Image}
                                        source={require('../assets/images/banner/Banner3.png')} />
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
    Content: {
        marginHorizontal: sizeWidth(2.5),
        flexDirection: 'row',
    },
    BoxImage: {
        marginHorizontal: sizeWidth(2.5),
        width: sizeWidth(75),
        height: sizeWidth(30),
        borderRadius: 8,
        overflow: 'hidden',
    },
    Image: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});
