/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../assets/colors/Index';
import { sizeFont, sizeWidth } from '../assets/responsive';
import Headers from '../components/Header/Headers';
import Promo from '../components/Notifikasi/Promo';
import Produk from '../components/Notifikasi/Produk';


export default function Notifikasi({ navigation }) {

    const [produk, setProduk] = useState(null);
    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={'Notifikasi'} />
            <Promo
                navigation={navigation}
            />
            <View style={{
                backgroundColor: color.bgWhite,
                flex: 1,
            }}>
                <Text style={{
                    marginLeft: sizeWidth(5),
                    fontSize: sizeFont(3.8),
                    marginVertical: hp(2),
                }}>Status Pesanan</Text>
                {
                    produk === null ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image
                                source={require('../assets/images/Notif/Notifikasi.png')}
                                style={{
                                    resizeMode: 'contain',
                                    width: '40%',
                                    height: '40%',
                                }}
                            />
                            <Text style={{
                                fontSize: sizeFont(3.5),
                                color: color.fontBlack1,
                                marginBottom: hp(15),
                            }}>Belum ada notifikasi pesanan</Text>
                        </View>
                        :
                        <View>
                            <Produk
                                navigation={navigation}
                                status={0}
                            />
                            <Produk
                                navigation={navigation}
                                status={1}
                            />
                        </View>
                }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
