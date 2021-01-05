import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Rekomendasi() {
    return (
        <View style={styles.Container}>
            <Text style={{
                fontSize: sizeFont(3.5),
            }}>Rekomendasi Pencarian</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        marginTop: sizeHeight(1),
        paddingHorizontal: sizeWidth(5),
    },
});
