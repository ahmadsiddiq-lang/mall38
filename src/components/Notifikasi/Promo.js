/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../../assets/fonts';

export default function Promo({ navigation }) {

    const [dataPromo, setDataPromo] = useState(null);
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
                {
                    dataPromo !== null &&
                    <View style={styles.CircleNotif}>
                        <Text style={{
                            fontSize: sizeFont(3),
                            color: color.fontWhite,
                            fontFamily: Poppins.Medium,
                        }}>2</Text>
                    </View>
                }
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
    CircleNotif: {
        // position: 'absolute',
        width: wp(5),
        height: wp(5),
        borderRadius: wp(5) / 2,
        backgroundColor: color.mainColor,
        marginLeft: wp(2),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
