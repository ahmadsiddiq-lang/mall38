/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { color } from '../../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../../assets/responsive';
import { getProdukCategori } from '../../redux/actions/ProdukCategori';

export default function Categori({ dataCategori, navigation }) {
    const dispatch = useDispatch();
    const data = dataCategori;

    const handleCategori = async (idCategori) => {
        if (idCategori) { dispatch(getProdukCategori(idCategori)); }
    };

    return (
        <View style={styles.Container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: sizeWidth(2.5),
                    paddingVertical: sizeHeight(1),
                }}>
                    {
                        data &&
                        data.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => handleCategori(item.id)}
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
