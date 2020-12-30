/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Alamat from '../components/DetailOrder/Alamat';
import CardProduk from '../components/DetailOrder/CardProduk';
import InfoPengiriman from '../components/DetailOrder/InfoPengiriman';
import Headers from '../components/Header/Headers';
import MetodeBayar from '../components/DetailOrder/MetodeBayar';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DetailOrder({ navigation, route }) {

    // console.log(route.params.orderId);
    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={'Detail Pesanan'} />
            <ScrollView>
                <Alamat />
                <InfoPengiriman />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: color.bgWhite,
                    paddingVertical: sizeHeight(1),
                    paddingHorizontal: sizeWidth(5),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3),
                        color: color.fontBlack1,
                    }}>Status pembayaran</Text>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                        color: color.mainColor,
                        textTransform: 'capitalize',
                    }}>Pending</Text>
                </View>
                <View style={styles.BoxCard}>
                    <CardProduk />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: sizeWidth(5),
                    backgroundColor: color.bgWhite,
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                    }}>Ongkir</Text>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                        color: color.mainColor,
                    }}>  Rp. 300.000</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: sizeWidth(5),
                    backgroundColor: color.bgWhite,
                    paddingBottom: sizeHeight(1),
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                    }}>2 produk</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                    }}>Total Pesanan :
                    <Text style={{
                            fontSize: sizeFont(4),
                            fontFamily: Poppins.Medium,
                            color: color.mainColor,
                        }}>  Rp. 300.000</Text>
                    </Text>
                </View>
                <MetodeBayar />
            </ScrollView>
            <View style={{
                paddingVertical: sizeHeight(2),
                paddingHorizontal: sizeWidth(5),
                backgroundColor: color.bgWhite,
                borderTopWidth: 1,
                borderTopColor: color.border2,
            }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        paddingVertical: sizeHeight(1),
                        borderRadius: 8,
                        alignItems: 'center',
                        backgroundColor: color.mainColor,
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Ionicons name="logo-whatsapp" color={color.fontWhite} size={sizeFont(6)} />
                    <Text style={{
                        color: color.fontWhite,
                        fontSize: sizeFont(3.5),
                        marginLeft: sizeWidth(2),
                        fontFamily: Poppins.Medium,
                    }}>Chat Penjual</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    BoxCard: {
        backgroundColor: color.bgWhite,
        paddingHorizontal: sizeWidth(5),
    },
});
