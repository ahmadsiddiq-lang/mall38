import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Pembayaran({ navigation, route }) {

    console.log(route.params);

    return (
        <View>
            <Text>Pembayaran</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
