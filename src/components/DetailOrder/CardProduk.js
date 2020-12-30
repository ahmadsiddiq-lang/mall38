/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function CardProduk() {
    return (
        <View style={styles.Container}>
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: color.border1,
                paddingBottom: sizeHeight(1),
            }}>
                <View style={{
                    width: sizeWidth(20),
                    height: sizeWidth(20),
                }}>
                    <Image
                        resizeMethod="auto"
                        style={{
                            resizeMode: 'contain',
                            width: '100%',
                            height: '100%',
                        }}
                        source={require('../../assets/images/Produk/imagedefault.png')} />
                </View>
                <View style={{
                    flex: 1,
                    paddingHorizontal: sizeWidth(3),
                }}>
                    <Text numberOfLines={1} style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                    }}>Tas Wanita</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            color: color.fontBlack1,
                        }}>tas</Text>
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            color: color.fontBlack1,
                        }}>x1</Text>
                    </View>
                    <Text style={{
                        textAlign: 'right',
                        fontSize: sizeFont(3.3),
                        color: color.mainColor,
                    }}>Rp. 200.000</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        marginVertical: sizeHeight(1),
    },
});
