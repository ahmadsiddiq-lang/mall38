/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../../assets/fonts';

export default function Headers({ navigation, title = '', onPress, backgroundColor, colorBtnBack, textColo }) {
    return (
        <View style={[styles.Container, backgroundColor && {
            backgroundColor: backgroundColor,
        }]}>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
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
                        color={colorBtnBack ? colorBtnBack : color.fontWhite}
                    />
                </TouchableOpacity>
                <Text style={{
                    marginLeft: sizeWidth(5),
                    fontSize: sizeFont(4.5),
                    color: textColo ? textColo : color.fontWhite,
                    fontFamily: Poppins.Medium,
                }}>{title}</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                activeOpacity={0.8}
                style={{
                    paddingVertical: sizeWidth(3.5),
                    paddingRight: sizeWidth(5),
                }}
            >
                <Ionicons
                    name="search"
                    size={sizeFont(6.5)}
                    color={colorBtnBack ? colorBtnBack : color.fontWhite}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: color.mainColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
        // borderBottomColor: color.border2,
    },
});
