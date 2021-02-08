/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../../assets/colors/Index';
import { Poppins } from '../../../assets/fonts';
import { sizeFont, sizeWidth } from '../../../assets/responsive';
import Headers from '../../Header/Headers';

export default function Panduan({ navigation, route }) {

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Panduan'}
            />
            <View style={{
                flex: 1,
                backgroundColor: color.bgWhite,
                paddingHorizontal: sizeWidth(5),
            }}>
                <Text style={{
                    fontSize: sizeFont(4.5),
                    fontFamily: Poppins.Medium,
                    color: color.fontBlack,
                    marginTop: hp(2),
                    textAlign: 'center',
                }}>Cek Status Pemesanan</Text>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    marginTop: hp(2),
                    textAlign: 'center',
                }}>Anda bisa mengetahui Status Pemesanan anda dengan Login sebagai Member dan masuk ke akun profil anda. Pilih ORDER HISTORY AND DETAILS.</Text>
                <View style={{
                    marginTop: hp(3),
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1.5,
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                            }}>1.</Text>
                            <View style={{
                                paddingHorizontal: sizeWidth(2),
                                borderRadius: 8,
                                backgroundColor: 'yellow',
                                marginLeft: sizeWidth(1),
                                height: hp(3),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                }}>Pending</Text>
                            </View>
                        </View>
                        <Text style={{
                            marginLeft: sizeWidth(10),
                            flex: 3,
                            fontSize: sizeFont(3.5),
                        }}>: Menunggu Pengiriman Barang</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: hp(2),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1.5,
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                            }}>2.</Text>
                            <View style={{
                                paddingHorizontal: sizeWidth(2),
                                borderRadius: 8,
                                backgroundColor: 'yellow',
                                marginLeft: sizeWidth(1),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                }}>Conplate Payment</Text>
                            </View>
                        </View>
                        <Text style={{
                            marginLeft: sizeWidth(10),
                            flex: 3,
                            fontSize: sizeFont(3.5),
                        }}>: Menunggu konfirmasi Transfer Anda</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: hp(2),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1.5,
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                            }}>3.</Text>
                            <View style={{
                                paddingHorizontal: sizeWidth(2),
                                borderRadius: 8,
                                backgroundColor: 'green',
                                marginLeft: sizeWidth(1),
                                height: hp(3),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                    color: color.fontWhite,
                                }}>Paid</Text>
                            </View>
                        </View>
                        <Text style={{
                            marginLeft: sizeWidth(10),
                            flex: 3,
                            fontSize: sizeFont(3.5),
                        }}>: Kami Telah Menyetujui Konfirmasi Pembayaran Anda dan kami akan memproses dalam waktu 1 x 24 jam</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: hp(2),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1.5,
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                            }}>4.</Text>
                            <View style={{
                                paddingHorizontal: sizeWidth(2),
                                borderRadius: 8,
                                backgroundColor: 'green',
                                marginLeft: sizeWidth(1),
                                height: hp(3),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                    color: color.fontWhite,
                                }}>Delivery</Text>
                            </View>
                        </View>
                        <Text style={{
                            marginLeft: sizeWidth(10),
                            flex: 3,
                            fontSize: sizeFont(3.5),
                        }}>: Barang Telah terkirim</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
