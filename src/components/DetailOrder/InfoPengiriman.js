/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { detailOrder } from '../../redux/actions/DetailOrder';

export default function InfoPengiriman({ navigation, dataDetailOrder }) {

    // console.log(dataDetailOrder);
    return (
        <View style={{
            paddingHorizontal: sizeWidth(5),
            backgroundColor: color.bgWhite,
            marginBottom: sizeHeight(1),
            paddingVertical: sizeHeight(2),
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <FontAwesome5 name="truck" size={sizeFont(4)} color={color.mainColor} light />
                    <Text style={{
                        marginLeft: sizeWidth(4),
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                    }}>Info Pengiriman</Text>
                </View>
                <Text
                    onPress={() => navigation.navigate('InfoPengirimanBarang', {
                        dataOrder: dataDetailOrder,
                    })}
                    style={{
                        fontSize: sizeFont(3.5),
                        color: color.mainColor,
                    }}>Lihat Detail</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                marginTop: sizeHeight(2),
                marginLeft: sizeWidth(3),
            }}>
                <View style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10 / 2,
                    backgroundColor: color.mainColor,
                    marginTop: 5,
                }} />
                <View style={{
                    marginLeft: sizeWidth(4),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.mainColor,
                        fontFamily: Poppins.Italic,
                    }}>Paket akan dikirim melaui {dataDetailOrder.courier}</Text>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3),
                            color: color.fontBlack1,
                        }}>Status pengiriman : </Text>
                        <Text style={{
                            fontSize: sizeFont(3),
                            color: color.mainColor,
                            fontFamily: Poppins.Medium,
                        }}>{dataDetailOrder.status_pengiriman}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
