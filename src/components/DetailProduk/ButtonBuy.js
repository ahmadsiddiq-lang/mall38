/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { getIdUser, openWhatsApp } from '../../config/function';
import base64 from 'react-native-base64';


export default function ButtonBuy({ navigation, handleAddTocat, detailProduk, handleBuy }) {


    const handleToWa = useCallback(async () => {
        const idUser = await getIdUser();
        var text = detailProduk.id;
        var encoded = base64.encode(text.toString());
        // console.log(encoded);
        console.log('https://mall38.com/product/data-produk/' + encoded);
        if (idUser) {
            openWhatsApp('https://mall38.com/product/data-produk/' + encoded);
        }
    }, [detailProduk]);

    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => handleToWa()}
                activeOpacity={0.8}
                style={[styles.BtnAddCart, {
                    backgroundColor: color.bgWhite,
                    marginRight: sizeWidth(2),
                    flex: 1,
                    borderWidth: 2,
                    borderColor: color.mainColor,
                }]}>
                <FontAwesome5 name="whatsapp" size={sizeFont(6)} solid color={color.mainColor} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleAddTocat(detailProduk)}
                activeOpacity={0.8}
                style={[styles.BtnAddCart, {
                    backgroundColor: color.bgWhite,
                    marginRight: sizeWidth(2),
                    flex: 1,
                    borderWidth: 2,
                    borderColor: color.mainColor,
                }]}>
                <FontAwesome5 name="cart-plus" size={sizeFont(5)} solid color={color.mainColor} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleBuy(detailProduk)}
                activeOpacity={0.8}
                style={[styles.BtnAddCart, {
                    flex: 3,
                }]}>
                <Text style={{
                    fontSize: sizeFont(4),
                    fontFamily: Poppins.Medium,
                    color: color.fontWhite,
                }}>BELI</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        paddingHorizontal: sizeWidth(5),
        paddingBottom: sizeHeight(1),
        bottom: 0,
        // borderWidth: 1,
        backgroundColor: color.bgWhite,
        paddingTop: sizeHeight(1),
        borderTopWidth: 1,
        borderColor: color.border3,
    },
    BtnAddCart: {
        alignItems: 'center',
        paddingVertical: sizeHeight(0.5),
        backgroundColor: color.mainColor,
        borderRadius: 8,
        justifyContent: 'center',
    },
});
