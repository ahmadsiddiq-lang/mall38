/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Promo({ navigation }) {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Promo')}
            activeOpacity={0.8}
            style={styles.Container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <View style={{
                    width: sizeWidth(13),
                    height: sizeWidth(13),
                    borderWidth: 1.5,
                    borderColor: color.border3,
                    borderRadius: 100,
                    padding: sizeWidth(3),
                }}>
                    <Image
                        source={require('../../assets/images/banner/Promo.png')}
                        style={{
                            resizeMode: 'contain',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>
                <Text style={{
                    fontSize: sizeFont(3.8),
                    marginLeft: sizeWidth(3),
                }}>Promo produk</Text>
            </View>
            <Ionicons name="chevron-forward" size={sizeFont(4)} color={color.mainColor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Container: {
        elevation: 3,
        backgroundColor: color.bgWhite,
        // borderBottomWidth: 0.5
        height: hp(10),
        paddingHorizontal: sizeWidth(5),
        paddingVertical: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
