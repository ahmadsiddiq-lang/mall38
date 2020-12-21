import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../assets/colors/Index';
import { useSelector } from 'react-redux';
import { getIdUser } from '../../config/function';
export default function HeaderDetailProduk({ navigation, clearDetailProduks }) {

    const dataCart = useSelector(state => state.cart.dataCart);

    const handleTocart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser === null) {
            // console.log(idUser);
            navigation.navigate('Login');
        } else {
            navigation.navigate('Cart');
            // clearDetailProduks();
        }
    }, [navigation]);

    const handleGoback = () => {
        navigation.goBack();
        clearDetailProduks();
    };

    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={() => handleGoback()}
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
                    activeOpacity={0.8}
                    style={styles.Btn}
                >
                    <Ionicons
                        name="share-social"
                        size={sizeFont(6.5)}
                        color={color.mainColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleTocart()}
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
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.Btn}
                >
                    <Ionicons
                        name="ellipsis-vertical"
                        size={sizeFont(6.5)}
                        color={color.mainColor}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        zIndex: 1,
        height: sizeHeight(6.5),
        // borderBottomWidth: 1,
        borderBottomColor: color.border2,
        // backgroundColor: 'rgba(252, 252, 252,0.5)',
        // backgroundColor: color.bgWhite,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: sizeWidth(5),
        justifyContent: 'space-between',
        marginTop: sizeHeight(3.8),
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
        width: '40%',
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
