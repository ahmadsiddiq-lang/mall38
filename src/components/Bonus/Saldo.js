/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { rupiah } from '../../config/function';

export default function Saldo({ dataWallet, dataHistoryWallet, getMount }) {


    const BonusMasuk = () => {
        if (dataHistoryWallet != null) {
            let total = 0;
            dataHistoryWallet.forEach(element => {
                total += element.in;
            });
            return total;
        }
    };
    const BonusKeluar = () => {
        if (dataHistoryWallet != null) {
            let total = 0;
            dataHistoryWallet.forEach(element => {
                total += element.out;
            });
            return total;
        }
    };

    // console.log(BonusPasif());


    return (
        <LinearGradient colors={[color.bgWhite, color.bgWhite, '#c19fd6']}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: color.mainColor,
                padding: sizeWidth(3),
                borderRadius: 8,
                marginHorizontal: sizeWidth(5),
                marginTop: sizeHeight(3),
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        color: color.fontWhite,
                    }}>Saldo Bonus</Text>
                    <Text style={{
                        fontSize: sizeFont(4),
                        fontFamily: Poppins.Medium,
                        color: color.fontWhite,
                    }}>Rp. {dataWallet !== null ? rupiah(dataWallet.tbonus) : '0'}</Text>
                </View>
                <View style={{
                    paddingHorizontal: sizeWidth(5),
                    paddingVertical: 5,
                    backgroundColor: color.bgWhite,
                    borderRadius: 100,
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        color: color.mainColor,
                    }}>Withdraw</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => getMount()}
                activeOpacity={0.8}
                style={{
                    marginVertical: sizeHeight(2),
                    backgroundColor: 'rgba(193, 159, 214,0.4)',
                    marginHorizontal: sizeWidth(5),
                    padding: sizeWidth(3),
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image
                        resizeMethod="auto"
                        source={require('../../assets/images/pageAkun/Bulan.png')}
                        style={{
                            resizeMode: 'contain',
                            width: sizeWidth(5),
                            height: sizeWidth(5),
                        }}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        marginLeft: sizeWidth(3),
                        color: color.mainColor,
                    }}>Januari 2021</Text>
                </View>
                <Ionicons
                    name="chevron-down"
                    size={sizeFont(4)}
                    color={color.mainColor}
                />
            </TouchableOpacity>
            <View style={{
                borderWidth: 1,
                borderColor: color.border2,
                padding: sizeWidth(3),
                borderRadius: 8,
                marginHorizontal: sizeWidth(5),
                backgroundColor: color.bgWhite,
                marginBottom: sizeHeight(2),
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        color: color.fontBlack1,
                    }}>Bonus Masuk</Text>
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.mainColor,
                    }}>{dataHistoryWallet != null ? BonusMasuk() : '0'}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        color: color.fontBlack1,
                    }}>Bonus Keluar</Text>
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.mainColor,
                    }}>{dataHistoryWallet != null ? BonusKeluar() : '0'}</Text>
                </View>
            </View>
        </LinearGradient>
    );
}
