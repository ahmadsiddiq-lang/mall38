/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
export default function ButtonBuy({ navigation, handleAddTocat, detailProduk }) {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => handleAddTocat(detailProduk)}
                activeOpacity={1}
                style={[styles.BtnAddCart, {
                    backgroundColor: '#05991d',
                    marginRight: sizeWidth(2),
                    flex: 1,
                }]}>
                <FontAwesome5 name="cart-plus" size={sizeFont(5)} solid color={color.fontWhite} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
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
