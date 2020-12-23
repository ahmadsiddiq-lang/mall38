import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { rupiah } from '../../config/function';

export default function Deskripsi({ navigation, fixDataCart = [] }) {

    const TotalHargaProduk = () => {
        let total = 0;
        fixDataCart.forEach(element => {
            total += (Number(element.product.price) * Number(element.qty));
        });
        return total;
    };

    const TotalBayar = () => {
        let total = 0;
        const Ongkir = 20000;
        fixDataCart.forEach(element => {
            total += (Number(element.product.price) * Number(element.qty));
        });
        return total + Ongkir;
    };

    const handleNav = () => {
        if (fixDataCart.length > 0) {
            navigation.navigate('CheckOut', {
                data: fixDataCart,
            });
        }
    };

    return (
        <View style={styles.Container}>
            <View style={styles.Item}>
                <Text style={styles.TextTitle}>Sub Total</Text>
                <Text style={styles.TextItem}>Rp. {rupiah(TotalHargaProduk())}</Text>
            </View>
            {/* <View style={styles.Item}>
                <Text style={styles.TextTitle}>Ongkos Kirim</Text>
                <Text style={styles.TextItem}>Rp. 20.000</Text>
            </View>
            <View style={styles.Item}>
                <Text style={styles.TextTitle}>Diskon</Text>
                <Text style={styles.TextItem}>0%</Text>
            </View>
            <View style={styles.Item}>
                <Text style={styles.TextTitle}>Total Bayar</Text>
                <Text style={styles.TextItem}>Rp. {rupiah(TotalBayar())}</Text>
            </View> */}
            <View style={{
                marginTop: sizeHeight(3),
            }}>
                <TouchableOpacity
                    onPress={() => handleNav()}
                    activeOpacity={0.8}
                    style={styles.BtnBuy}
                >
                    <Text style={{
                        fontSize: sizeFont(4),
                        fontFamily: Poppins.Bold,
                        color: color.fontWhite,
                    }}>CHECK OUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        borderTopWidth: 1,
        borderTopColor: color.border2,
        position: 'absolute',
        bottom: 0,
        width: SCREEN_WIDTH,
        backgroundColor: color.bgWhite,
        paddingTop: sizeHeight(1),
        paddingHorizontal: sizeWidth(8),
        paddingBottom: sizeHeight(1.5),
    },
    Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TextTitle: {
        fontSize: sizeFont(3.8),
        fontFamily: Poppins.Medium,
        color: color.fontBlack1,
    },
    TextItem: {
        fontSize: sizeFont(3.8),
        fontFamily: Poppins.Medium,
        color: color.mainColor,
    },
    BtnBuy: {
        backgroundColor: color.mainColor,
        alignItems: 'center',
        paddingVertical: sizeHeight(0.8),
        borderRadius: 8,
    },
});
