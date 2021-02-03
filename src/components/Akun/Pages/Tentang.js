/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Headers from '../../Header/Headers';

export default function Tentang({ navigation, route }) {

    const title = route.params.title;
    const body = route.params.body;

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={title}
            />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <Text>{body}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
