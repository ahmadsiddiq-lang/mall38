import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../../assets/fonts';

export default function Headers({ navigation, title = '', onPress }) {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
                style={{
                    paddingVertical: sizeWidth(3.5),
                    paddingLeft: sizeWidth(5),
                }}
            >
                <Ionicons
                    name="arrow-back"
                    size={sizeFont(6.5)}
                    color={color.fontWhite}
                />
            </TouchableOpacity>
            <Text style={{
                marginLeft: sizeWidth(5),
                fontSize: sizeFont(4.5),
                color: color.fontWhite,
                fontFamily: Poppins.Medium,
            }}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: color.mainColor,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
    },
});
