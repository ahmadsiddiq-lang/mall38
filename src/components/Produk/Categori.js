/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeWidth } from '../../assets/responsive';

export default function Categori({ dataCategori, navigation }) {
    const data = dataCategori;

    return (
        <View style={styles.Container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: sizeWidth(2.5),
                }}>
                    {
                        data &&
                        data.map((item, index) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('ProductCategori', {
                                        category: item,
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
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: color.bgWhite,
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
    },
    BoxImage: {
        width: sizeWidth(13),
        height: sizeWidth(15),
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
