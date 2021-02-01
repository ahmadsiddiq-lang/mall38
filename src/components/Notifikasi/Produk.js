/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeWidth } from '../../assets/responsive';

export default function Produk({ status, navigation }) {

    return (
        <View style={[styles.Container,
        status === 0 &&
        {
            backgroundColor: '#f8f0fc',
        },
        ]}>
            <View style={{
                width: sizeWidth(15),
                height: sizeWidth(15),
            }}>
                <Image
                    source={require('../../assets/images/Produk/imagedefault.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </View>
            <View style={{
                flex: 1,
                paddingLeft: sizeWidth(3),
                paddingRight: sizeWidth(5),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                    marginVertical: heightPercentageToDP(0.5),
                }}>Pesanan telah sampai</Text>
                <Text style={{
                    fontSize: sizeFont(3.3),
                    color: color.fontBlack2,
                }}>Silahkan periksa semua produk pesanan mu. Jika kamu merasa puas dengan pesanan mu, silahkan klik Pesanan DIterima</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        elevation: 2,
        borderColor: color.border3,
        backgroundColor: color.bgWhite,
        flexDirection: 'row',
        marginVertical: heightPercentageToDP(1),
    },
});
