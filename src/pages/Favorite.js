import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header/Home';

export default function Favorite({ navigation }) {
    return (
        <View>
            <Header navigation={navigation} />
            <Text>Favorite</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
