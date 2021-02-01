/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeFont } from '../assets/responsive';
import Headers from '../components/Header/Headers';

export default function Promo({ navigation }) {
    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Promo'}
            />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: sizeFont(4),
                    color: color.fontBlack1,
                }}>Belum ada promo</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
