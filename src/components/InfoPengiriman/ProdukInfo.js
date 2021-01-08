/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function ProdukInfo() {
    return (
        <View style={{
            marginTop: sizeHeight(1.5),
            paddingHorizontal: sizeWidth(5),
        }}>
            <View style={{
                borderWidth: 1,
                borderColor: color.border3,
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: color.bgWhite,
                flexDirection: 'row',
            }}>
                <View style={{
                    width: sizeWidth(20),
                    height: sizeWidth(20),
                    padding: sizeWidth(2),
                }}>
                    <Image source={require('../../assets/images/Produk/tas.jpg')}
                        resizeMethod="auto"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>
                <View style={{
                    marginLeft: sizeWidth(1),
                    padding: sizeWidth(1.5),
                    flex: 1,
                    paddingRight: sizeWidth(3),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                    }}>Tas Wanita</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3),
                        }}>Dikirim tanggal</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>20-08-2020</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3),
                        }}>Dikirim menggunakan</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>JNE</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
