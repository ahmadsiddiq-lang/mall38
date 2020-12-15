import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Categori() {
    return (
        <View style={styles.Container}>
            {
                [1, 2, 3, 4].map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        style={styles.BoxImage}>
                        <Image resizeMethod="auto" style={styles.image} source={require('../../assets/images/categori/Icon4.png')} />
                    </TouchableOpacity>
                ))
            }

        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(2),
        backgroundColor: color.bgWhite,
    },
    BoxImage: {
        width: sizeWidth(13),
        height: sizeWidth(13),
        overflow: 'hidden',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: sizeWidth(13),
        height: sizeWidth(13),
    },

});
