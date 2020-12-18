/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Categori({ dataCategori, navigation }) {

    const data = dataCategori;

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.Container}>
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: sizeWidth(2.5),
                paddingVertical: sizeHeight(1.5),
            }}>
                {
                    data &&
                    data.map((item, index) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ProductCategori', {
                                    idCategori: item.id,
                                })
                            }
                            key={index}
                            activeOpacity={0.8}
                            style={styles.BoxImage}>
                            <Image resizeMethod="auto" style={styles.image} source={{ uri: item.icon }} />
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: color.bgWhite,
    },
    BoxImage: {
        width: sizeWidth(10),
        height: sizeWidth(10),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: sizeWidth(2.5),
    },
    image: {
        width: sizeWidth(8),
        height: sizeWidth(8),
    },

});
