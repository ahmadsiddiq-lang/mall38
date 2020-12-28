/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MetodeBayar({ handleMOdalItem, metodeBayar }) {
    return (
        <View style={styles.Container}>
            <Text style={{
                fontSize: sizeFont(3.5),
                fontFamily: Poppins.Medium,
                marginBottom: sizeHeight(1),
            }}>Metode Bayar</Text>
            <TouchableOpacity
                onPress={() => handleMOdalItem(1)}
                activeOpacity={0.8}
                style={styles.Content}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        marginLeft: sizeWidth(2),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.7),
                            fontFamily: Poppins.Italic,
                        }}>Bank {metodeBayar.name}</Text>
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            color: color.fontBlack1,
                        }}>Transfer Bank</Text>
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
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        // borderWidth: 1,
        // borderColor: color.border2,
        borderRadius: 8,
        paddingBottom: sizeHeight(1),
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
