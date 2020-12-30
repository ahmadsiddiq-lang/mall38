/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { getIdUser, openWhatsApp } from '../../config/function';
import { BASE_URL } from '../../config/URL';
export default function ButtonBuy({ navigation, handleAddTocat, detailProduk, handleBuy }) {

    // console.log(encodedData);

    const handleToWa = useCallback(async () => {
        const encodedData = window.btoa(detailProduk.id);
        const idUser = await getIdUser();
        if (idUser) {
            openWhatsApp('https://mall38.com/product/tunik-msb2009/' + encodedData);
        } else {
            navigation.navigate('Login');
        }
    }, [navigation, detailProduk]);

    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => handleToWa()}
                activeOpacity={0.8}
                style={[styles.BtnAddCart, {
                    backgroundColor: '#05991d',
                    marginRight: sizeWidth(2),
                    flex: 1,
                }]}>
                <FontAwesome5 name="whatsapp" size={sizeFont(5)} solid color={color.fontWhite} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleAddTocat(detailProduk)}
                activeOpacity={0.8}
                style={[styles.BtnAddCart, {
                    backgroundColor: '#05991d',
                    marginRight: sizeWidth(2),
                    flex: 1,
                }]}>
                <FontAwesome5 name="cart-plus" size={sizeFont(5)} solid color={color.fontWhite} />
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
    },
    BtnAddCart: {
        alignItems: 'center',
        paddingVertical: sizeHeight(0.7),
        backgroundColor: color.mainColor,
        borderRadius: 8,
        justifyContent: 'center',
    },
});
