import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { color } from '../assets/colors/Index';
import Headers from '../components/Header/Headers';

export default function CheckOut({ navigation, route }) {

    console.log(route.params);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <Headers navigation={navigation} />
            <Text>CheckOut</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
