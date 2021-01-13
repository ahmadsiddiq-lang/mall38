/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../assets/colors/Index';

export default function HeaderCart({ navigation, dataCart }) {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
                style={styles.Btn}
            >
                <Ionicons
                    name="arrow-back"
                    size={sizeFont(6.5)}
                    color={color.mainColor}
                />
            </TouchableOpacity>
            <View style={styles.BoxBtnRight}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Search')}
                    activeOpacity={0.8}
                    style={styles.Btn}
                >
                    <Ionicons
                        name="search"
                        size={sizeFont(6.5)}
                        color={color.mainColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.Btn}
                >
                    <Ionicons
                        name="cart"
                        size={sizeFont(6.5)}
                        color={color.mainColor}
                    />
                    <View style={styles.Circle}>
                        <Text style={{
                            color: color.fontWhite,
                            fontSize: sizeFont(3),
                        }}>{dataCart ? dataCart.length : '0'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        // borderBottomColor: color.border2,
        // height: sizeHeight(6.5),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: sizeWidth(5),
        paddingTop: sizeHeight(2),
    },
    Btn: {
        // padding: sizeHeight(2),
        backgroundColor: 'rgba(0, 0, 0,0.1)',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: sizeWidth(8),
        height: sizeWidth(8),
    },
    BoxBtnRight: {
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'space-between',
    },
    Circle: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: '#32a852',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        top: -8,
        right: -8,
    },
});
