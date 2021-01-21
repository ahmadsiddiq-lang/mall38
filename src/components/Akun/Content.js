/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../../assets/fonts';

export default function Content() {

    return (
        <View style={styles.Container}>
            <Text style={{
                fontSize: sizeFont(3.5),
                fontFamily: Poppins.Medium,
                marginLeft: sizeWidth(5),
            }}>Laporan Pendapatan</Text>
            <View style={{
                marginLeft: sizeWidth(5),
            }}>
                <View />
                <Text>Rp. 50.500</Text>
                <Text>Bonus Active</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
