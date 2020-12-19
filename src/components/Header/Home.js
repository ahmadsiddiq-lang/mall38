/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function Home({ navigation }) {

    const dataCart = useSelector(state => state.cart.dataCart);

    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => console.log(navigation)}
                activeOpacity={0.8}
                style={styles.BoxSearch}>
                <Ionicons
                    name="search"
                    color={color.mainColor}
                    size={sizeFont(5)}
                />
                <Text style={styles.textInput}>Mau kirim apa hari ini</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    padding: 10,
                    paddingLeft: 15,
                }}
            >
                <Ionicons
                    name="notifications"
                    color={color.fontWhite}
                    size={sizeFont(6)}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                activeOpacity={0.8}
                style={{
                    paddingLeft: 5,
                    paddingVertical: 10,
                }}
            >
                <Ionicons
                    name="cart"
                    color={color.fontWhite}
                    size={sizeFont(6)}
                />
                <View style={styles.Circle}>
                    <Text style={{
                        color: color.fontWhite,
                        fontSize: sizeFont(3),
                    }}>{dataCart ? dataCart.length : '0'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        // height: sizeHeight(6.5),
        backgroundColor: color.mainColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(0.5),
    },
    textInput: {
        color: color.mainColor,
        marginLeft: sizeWidth(2),
    },
    BoxSearch: {
        flexDirection: 'row',
        backgroundColor: color.bgWhite,
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: sizeWidth(2),
        paddingVertical: sizeHeight(0.8),
    },
    Circle: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: '#32a852',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: -8,
    },
});
