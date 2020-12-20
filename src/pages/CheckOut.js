import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Headers from '../components/Header/Headers';

export default function CheckOut({ navigation, route }) {

    console.log(route.params);

    return (
        <View style={styles.Container}>
            <Headers />
            <Text>CheckOut</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
