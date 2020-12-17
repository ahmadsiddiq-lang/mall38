import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../assets/colors/Index';
export default function HeaderDetailProduk({ navigation }) {
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
                    activeOpacity={0.8}
                    style={styles.Btn}
                >
                    <Ionicons
                        name="cart"
                        size={sizeFont(6.5)}
                        color={color.mainColor}
                    />
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
        // borderWidth: 1,
        backgroundColor: 'rgba(252, 252, 252,0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: sizeWidth(5),
        justifyContent: 'space-between',
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
});
