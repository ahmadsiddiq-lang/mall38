/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { getIdUser } from '../../config/function';

export default function Home({ navigation, headerOpacity }) {

    // const dispatch = useDispatch();
    const dataCart = useSelector(state => state.cart.dataCart);
    const data = dataCart;

    const handleToCart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            navigation.navigate('Cart');
        } else {
            navigation.navigate('Login');
        }
    }, [navigation]);

    return (
        <View style={styles.Container}>
            <Animated.View style={{
                backgroundColor: color.mainColor,
                position: 'absolute',
                width: SCREEN_WIDTH,
                height: '100%',
                opacity: headerOpacity,
            }} />
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Search')}
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
                    onPress={() => handleToCart()}
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
                    {
                        data.length > 0 &&
                        <View style={styles.Circle} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        width: SCREEN_WIDTH,
        height: sizeHeight(12),
        paddingHorizontal: sizeWidth(5),
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: sizeHeight(4.5),
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
        width: 10,
        height: 10,
        backgroundColor: '#2a05ff',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        right: -5,
    },
});
