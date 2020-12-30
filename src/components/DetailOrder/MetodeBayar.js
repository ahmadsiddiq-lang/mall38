/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function MetodeBayar({ dataDetailOrder }) {
    return (
        <View style={{
            backgroundColor: color.bgWhite,
            paddingHorizontal: sizeWidth(5),
            paddingVertical: sizeHeight(2),
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <FontAwesome5 name="money-check-alt" size={sizeFont(4.5)} color={color.mainColor} light />
                <Text style={{
                    fontSize: sizeFont(3.5),
                    marginLeft: sizeWidth(5),
                    fontFamily: Poppins.Medium,
                }}>Metode Pembayaran</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: sizeWidth(10),
                marginTop: sizeHeight(1),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    color: color.fontBlack1,
                }}>Bank
                     <Text style={{ textTransform: 'uppercase' }}> {dataDetailOrder.bank_name}</Text>
                </Text>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    color: color.mainColor,
                }}>Salin</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: sizeWidth(10),
                marginTop: sizeHeight(1),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.3),
                    color: color.fontBlack1,
                }}>Virtual Account</Text>
                <Text style={{
                    fontSize: sizeFont(4),
                    color: color.mainColor,
                }}>{dataDetailOrder.kode_pembayaran}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: sizeWidth(10),
                marginTop: sizeHeight(1),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.3),
                    color: color.fontBlack1,
                }}>Expired Time</Text>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    color: color.mainColor,
                }}>{dataDetailOrder.expired_time}</Text>
            </View>
        </View>
    );
}
