import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Banner() {
    return (
        <View style={styles.BoxBanner}>
            <View style={styles.BoxImageBanner}>
                <Image resizeMethod="resize" style={styles.Image} source={require('../../assets/images/Produk/tas.png')} />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.BoxContentImage}>
                    {
                        [1, 2, 3, 4, 5].map((item, index) => {
                            return (
                                <View key={index} style={styles.BoxImageItem}>
                                    <Image resizeMethod="resize" style={styles.Image} source={require('../../assets/images/Produk/tas.png')} />
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
    BoxBanner: {
        // borderWidth: 1,
        // height: sizeHeight(30),
        alignItems: 'center',
        backgroundColor: color.bgWhite,
    },
    Image: {
        // resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    BoxImageBanner: {
        width: sizeWidth(80),
        height: sizeHeight(35),
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderColor: color.border1,
    },
    BoxContentImage: {
        flexDirection: 'row',
        marginHorizontal: sizeWidth(2.5),
        backgroundColor: color.bgWhite,
        paddingVertical: sizeHeight(1),
    },
    BoxImageItem: {
        width: sizeWidth(20),
        height: sizeWidth(20),
        marginTop: sizeHeight(1),
        marginHorizontal: sizeWidth(2.5),
        borderWidth: 1.5,
        borderColor: color.bgBlack2,
    },
});
