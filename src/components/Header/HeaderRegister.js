import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../../assets/fonts';

export default function HeaderRegister({ navigation, title }) {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
                style={{
                    paddingLeft: sizeWidth(5),
                    paddingVertical: sizeHeight(1),
                    paddingRight: sizeWidth(2),
                }}
            >
                <Ionicons
                    name="arrow-back"
                    color={color.mainColor}
                    size={sizeFont(6.5)}
                />
            </TouchableOpacity>
            <Text style={{
                fontSize: sizeFont(4.5),
                fontFamily: Poppins.Bold,
                color: color.mainColor,
            }}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
        backgroundColor: color.bgWhite,
        height: sizeHeight(6.5),
        alignItems: 'center',
        flexDirection: 'row',
        width: SCREEN_WIDTH,
    },
});
