/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
            <Promo />
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
                    produk !== null ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: sizeFont(4),
                                color: color.fontBlack1,
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
