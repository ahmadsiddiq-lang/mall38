import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ListProduk() {
    return (
        <View style={styles.Container}>
            <Text>ListProduk</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
