/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { rupiah } from '../../config/function';

export default function BuatPesanan({ handleHargaTotal, handleMetodeBayar, handleTotalHargaBayar }) {


    return (
        <View style={styles.Container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                }}>Sub Total</Text>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    color: color.mainColor,
                }}>Rp. {handleHargaTotal() > 0 && rupiah(handleHargaTotal())}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                }}>Total Bayar</Text>
                <Text style={{
                    fontSize: sizeFont(4),
                    color: color.mainColor,
                }}>Rp. {handleTotalHargaBayar() > 0 && rupiah(handleTotalHargaBayar())}</Text>
            </View>
            <View style={{
                marginTop: sizeHeight(3),
            }}>
                <TouchableOpacity
                    onPress={() => handleMetodeBayar()}
                    activeOpacity={0.8}
                    style={styles.BtnBuy}
                >
                    <Text style={{
                        fontSize: sizeFont(4),
                        fontFamily: Poppins.Medium,
                        color: color.fontWhite,
                    }}>BUAT PESANAN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: color.bgWhite,
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(1.5),
        borderTopWidth: 1,
        borderTopColor: color.border2,
    },

    BtnBuy: {
        backgroundColor: color.mainColor,
        alignItems: 'center',
        paddingVertical: sizeHeight(0.8),
        borderRadius: 8,
    },
});
