import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { sizeHeight } from '../assets/responsive';

export default function MyTabbar() {
    return (
        <View style={styles.Container}>
            <Text>MyTabbar</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        height: sizeHeight(6),
    },
});
