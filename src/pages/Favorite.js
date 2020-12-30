/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeFont } from '../assets/responsive';
import Header from '../components/Header/Home';

export default function Favorite({ navigation }) {
    return (
        <View style={styles.Container}>
            <Header navigation={navigation} />
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    color: color.fontBlack1,
                }}>Produk Favorit belum ada</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
});
