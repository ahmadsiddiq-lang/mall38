/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Headers from '../../Header/Headers';

export default function RekeningBank({ navigation }) {
    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Saldo Bonus'}
            />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <Text>Rekening bank</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
