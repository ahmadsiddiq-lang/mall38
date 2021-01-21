import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Headers from '../components/Header/Headers';
import Saldo from '../components/Bonus/Saldo';
import History from '../components/Bonus/History';

export default function Bonus({ navigation, route }) {

    const title = route.params.title !== undefined ? route.params.title : null;

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={title}
            />
            <Saldo />
            <History />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
