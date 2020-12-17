/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { rupiah } from '../../config/function';
import { DefaultText } from '../DefaultText';
import Star from '../Star';

export default function Deskripsi({ detailProduk }) {
    return (
        <View>
            <View style={styles.BoxText}>
                <Text style={{
                    fontSize: sizeFont(4.7),
                    fontFamily: Poppins.Medium,
                }}>{detailProduk.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: sizeHeight(1),
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Star ratings={4} sizeStar={sizeFont(5)} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: sizeHeight(1),
                            paddingLeft: sizeWidth(2),
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                            }}>4.6</Text>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                                color: color.fontBlack1,
                                marginHorizontal: sizeWidth(2),
                            }}>|</Text>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                            }}>200 Terjual</Text>
                        </View>
                    </View>
                    <Text style={{
                        // textAlign: 'right',
                        fontSize: sizeFont(4.7),
                        fontFamily: Poppins.Medium,
                        color: color.mainColor,
                        flex: 2,
                        textAlign: 'right',
                    }} >Rp. {rupiah(detailProduk.price)}</Text>
                </View>
            </View>
            <View style={styles.BoxText}>
                <Text style={{
                    fontSize: sizeFont(4),
                    fontFamily: Poppins.Medium,
                    marginBottom: sizeHeight(1),
                }}>Deskripsi</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        color: color.fontBlack1,
                        flex: 1,
                    }}>Bahan</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        flex: 3,
                        textAlign: 'right',
                    }}>PU</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        color: color.fontBlack1,
                        flex: 1,
                    }}>Ukuran</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        flex: 3,
                        textAlign: 'right',
                    }}>P20XL9XT15CM</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        color: color.fontBlack1,
                        flex: 2,
                    }}>warna</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        flex: 3,
                        textAlign: 'right',
                        // color: color.fontBlack1,
                    }}>yellow, black, green, white, purple, blue</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        color: color.fontBlack1,
                        flex: 2,
                    }}>Stok</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        flex: 3,
                        textAlign: 'right',
                        // color: color.fontBlack1,
                    }}>{detailProduk.stok}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        color: color.fontBlack1,
                        flex: 2,
                    }}>Berat</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        fontFamily: Poppins.Medium,
                        flex: 3,
                        textAlign: 'right',
                        // color: color.fontBlack1,
                    }}>{detailProduk.berat}</Text>
                </View>
                <View style={{
                    marginTop: sizeHeight(1),
                }}>
                    <DefaultText>Pas banget buat di pake harian di rumah atau di luar rumah ini bahannya tebel gak terawang tapi gak gerah. Apalagi kalau cuacanya pas lagi dingin, dipakenya tuh enak banget di badan</DefaultText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    BoxText: {
        // borderTopWidth: 1,
        backgroundColor: color.bgWhite,
        // flex: 1,
        marginTop: sizeHeight(1),
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(1),
    },
});
