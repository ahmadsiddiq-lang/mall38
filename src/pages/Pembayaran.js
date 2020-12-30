/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Headers from '../components/Header/Headers';
import Clipboard from '@react-native-community/clipboard';
import { rupiah, ToasSuccess } from '../config/function';


export default function Pembayaran({ navigation, route }) {

    // console.log(route.params);

    const dataPembayaran = route.params.data;

    const SalinAccount = () => {
        Clipboard.setString(dataPembayaran.va_numbers[0].va_number);
        ToasSuccess('Berhasil disalin');
    };

    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={'Pembayaran'} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: color.bgWhite,
                paddingHorizontal: sizeWidth(5),
                paddingVertical: sizeHeight(1.5),
                marginBottom: sizeHeight(1),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                }}>Total Pembayaran</Text>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                    color: color.mainColor,
                }}>Rp. {dataPembayaran.gross_amount !== undefined && rupiah(dataPembayaran.gross_amount)}</Text>
            </View>
            <View style={{
                backgroundColor: color.bgWhite,
                paddingHorizontal: sizeWidth(5),
                paddingVertical: sizeHeight(1),
                marginBottom: sizeHeight(1),
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                    }}>Metode Pembayaran</Text>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                    }}>Bank Transfer</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: sizeHeight(2),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                    }}>Bank <Text style={{
                        textTransform: 'uppercase',
                    }} >{dataPembayaran.va_numbers[0].bank}</Text></Text>
                    <Text
                        onPress={() => SalinAccount()}
                        style={{
                            fontSize: sizeFont(3.5),
                            color: color.mainColor,
                        }}
                    >Salin</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                    }}>Virtual Account</Text>
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.mainColor,
                        fontFamily: Poppins.Medium,
                    }}>{dataPembayaran.va_numbers[0].va_number}</Text>
                </View>
            </View>
            <View style={{
                paddingHorizontal: sizeWidth(5),
                paddingVertical: sizeHeight(1.5),
                backgroundColor: color.bgWhite,
            }}>
                <Text style={{
                    fontSize: sizeFont(3.3),
                }}>Mohon lakukan pembayaran sebelum tanggal :</Text>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                    color: color.mainColor,
                }}>
                    {dataPembayaran.transaction_time} WIB
                 </Text>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: SCREEN_WIDTH,
                paddingHorizontal: sizeWidth(5),
                paddingVertical: sizeHeight(2),
                backgroundColor: color.bgWhite,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MyTabbar')}
                    activeOpacity={0.8}
                    style={{
                        paddingVertical: sizeHeight(1),
                        backgroundColor: color.mainColor,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.fontWhite,
                        fontFamily: Poppins.Bold,
                    }}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
