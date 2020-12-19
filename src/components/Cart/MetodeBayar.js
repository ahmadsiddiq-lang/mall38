/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MetodeBayar() {
    return (
        <View style={styles.Container}>
            <Text style={{
                fontSize: sizeFont(3.5),
                fontFamily: Poppins.Medium,
                marginBottom: sizeHeight(1),
            }}>Metode Bayar</Text>
            <View style={styles.Content}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={styles.BoxImage}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(10),
                            }}
                            source={require('../../assets/images/MetodeBayar/bni.png')} />
                    </View>
                    <View style={{
                        marginLeft: sizeWidth(2),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.7),
                            fontFamily: Poppins.Medium,
                        }}>BNI</Text>
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            color: color.fontBlack1,
                        }}>Bank Negara Indonesia</Text>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                }}>
                    <Ionicons
                        name="chevron-forward"
                        size={sizeFont(5)}
                        color={color.mainColor}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        borderWidth: 1,
        borderColor: color.border2,
        padding: sizeHeight(1),
        borderRadius: 8,
    },
    Content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    BoxImage: {
        backgroundColor: color.mainColor,
        borderRadius: 100,
        width: sizeWidth(15),
        height: sizeWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
