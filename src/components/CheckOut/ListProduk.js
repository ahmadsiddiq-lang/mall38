/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { rupiah } from '../../config/function';

export default function ListProduk({ item }) {

    const dataProduk = item.product;

    return (
        <View style={styles.Container}>
            <View style={{
                overflow: 'hidden',
                width: sizeWidth(23),
                height: sizeWidth(23),
                borderWidth: 2,
                borderColor: color.mainColor,
                borderRadius: 5,
            }}>
                {
                    dataProduk.image !== null ?
                        <Image resizeMethod="auto" style={{
                            resizeMode: 'contain',
                            width: '100%',
                            height: '100%',
                        }} source={{ uri: dataProduk.image }} />
                        :
                        <Image resizeMethod="auto" style={{
                            resizeMode: 'contain',
                            width: '100%',
                            height: '100%',
                        }} source={require('../../assets/images/Produk/imagedefault.png')} />
                }
            </View>
            <View style={{
                marginLeft: sizeWidth(3),
                flex: 1,
            }}>
                <Text numberOfLines={2} style={{
                    fontSize: sizeFont(3.8),
                    fontFamily: Poppins.Medium,
                }}>{dataProduk.name}</Text>
                <Text numberOfLines={0} style={{
                    fontSize: sizeFont(3.3),
                    color: color.fontBlack1,
                }}>Category : {dataProduk.category}</Text>
                <Text style={{
                    fontSize: sizeFont(3),
                    color: color.fontBlack1,
                }}>Berat {dataProduk.berat}g</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        fontSize: sizeFont(3),
                        color: color.fontBlack1,
                    }}>PV {dataProduk.pv}</Text>
                    <Text style={{
                        fontSize: sizeFont(3),
                        color: color.fontBlack1,
                    }}>BV {dataProduk.bv}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: sizeFont(3),
                        color: color.fontBlack1,
                    }}>Qty {item.qty}x</Text>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                        color: color.mainColor,
                        marginTop: sizeHeight(0.8),
                    }}>Rp. {rupiah(dataProduk.price)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        marginBottom: sizeHeight(1),
    },
});
