/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProdukVer from '../CardProdukVer';

export default function Rekomendasi({ navigation, loading, dataProduk = [], page }) {

    return (
        <View style={styles.Container}>
            {
                dataProduk ?
                    dataProduk.length > 0 ?
                        dataProduk.slice(0, 10).map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Blink', {
                                        idProduk: item.id,
                                    })}
                                    key={index} style={{
                                        width: sizeWidth(47.5),
                                    }}>
                                    <CardProdukVer navigation={navigation} item={item} />
                                </TouchableOpacity>
                            );
                        })
                        :
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontSize: sizeFont(5),
                                color: color.fontBlack1,
                            }}>Produk belum tersedia</Text>
                        </View>
                    :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator
                            size="large"
                            color={color.mainColor}
                        />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: sizeWidth(2.5),
        backgroundColor: color.bgWhite,
        marginTop: sizeHeight(1),
        paddingBottom: sizeHeight(6),
    },
});
