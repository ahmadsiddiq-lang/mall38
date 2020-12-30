/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Alamat() {
    return (
        <View style={styles.Container}>
            <Ionicons name="location-outline" color={color.mainColor} size={sizeFont(6)} />
            <View style={{
                marginLeft: sizeWidth(3),
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text>Alamat Pengiriman</Text>
                </View>
                <View>
                    <Text style={{
                        marginTop: sizeHeight(1),
                        fontSize: sizeFont(3.3),
                    }}>[08237375279]</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                    }}>Palembang sumatra selatan, Kecamatan Abab, Kabupaten Pali</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        backgroundColor: color.bgWhite,
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(1.5),
        marginBottom: sizeHeight(1),
    },
});
