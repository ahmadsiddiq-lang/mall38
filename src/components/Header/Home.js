/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getIdUser } from '../../config/function';
import { getCArt } from '../../redux/actions/Cart';

export default function Home({ navigation }) {

    // const dispatch = useDispatch();
    const dataCart = useSelector(state => state.cart.dataCart);
    const data = dataCart;

    // const hetDataCart = useCallback(async () => {
    //     const idUser = await getIdUser();
    //     if (idUser !== null) {
    //         dispatch(getCArt(idUser));
    //     }
    // }, [dispatch]);

    const handleToCart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            navigation.navigate('Cart');
        } else {
            navigation.navigate('Login');
        }
    }, [navigation]);

    // useEffect(() => {
    //     hetDataCart();
    // }, [hetDataCart]);

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
        width: 13,
        height: 13,
        backgroundColor: '#32a852',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        top: 8,
        right: -5,
        borderColor: color.borderWhite,
        borderWidth: 2,
    },
});
