import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Poppins } from '../assets/fonts';
import { sizeFont } from '../assets/responsive';

export const DefaultText = props => {
    return (
        <Text style={styles.text}>{props.children}</Text>
    );
};

export const DefaultTitle = (props) => {
    return (
        <Text style={styles.title}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: Poppins.Regular,
        fontSize: sizeFont(3.3),
    },
    title: {
        fontFamily: Poppins.Medium,
        fontSize: sizeFont(3.5),
    },
});
