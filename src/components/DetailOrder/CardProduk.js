/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { rupiah } from '../../config/function';

export default function CardProduk({ item, navigation }) {

    // const produk = item.order_product[0].product;
    // console.log(item);

    return (
        <View style={styles.Container}>
            <View
                style={styles.ListProduk}
            // activeOpacity={0.8}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: sizeHeight(1),
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
                        // }}>{item.status_pembayaran}</Text>
                    }}>Pending</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    borderBottomWidth: 0.5,
                    borderBottomColor: color.border1,
                    paddingBottom: sizeHeight(1),
                }}>
                    <View style={styles.BoxImage}>
                        {/* {
                            produk !== undefined ?
                                <Image
                                    resizeMethod="auto"
                                    style={{
                                        resizeMode: 'contain',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    source={{ uri: produk.image }} />
                                : */}
                        <Image
                            resizeMethod="auto"
                            style={{
                                resizeMode: 'contain',
                                width: '100%',
                                height: '100%',
                            }}
                            source={require('../../assets/images/Produk/imagedefault.png')} />
                        {/* } */}
                    </View>
                    <View style={{
                        flex: 1,
                        paddingHorizontal: sizeWidth(3),
                    }}>
                        <Text numberOfLines={1} style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                            // }}>{produk.name}</Text>
                        }}>Tas Wnita</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack1,
                                // }}>{produk.category.name}</Text>
                            }}>tas</Text>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack1,
                                // }}>x{item.order_product[0].qty}</Text>
                            }}>x1</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: sizeHeight(1),
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3),
                                color: color.fontBlack1,
                            }}>Status pengirirman</Text>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack1,
                                textTransform: 'capitalize',
                                // }}>{item.status_pengiriman}</Text>
                            }}>Pending</Text>
                        </View>
                        <Text style={{
                            textAlign: 'right',
                            fontSize: sizeFont(3.3),
                            color: color.mainColor,
                            // }}>Rp. {produk.price !== undefined && rupiah(produk.price)}</Text>
                        }}>Rp. 200.000</Text>
                    </View>
                </View>
                {/* {
                    item.order_product.length > 1 && */}
                <View style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: color.border1,
                    alignItems: 'center',
                    paddingVertical: sizeHeight(0.8),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                    }}>Tampilkan Produk</Text>
                </View>
                {/* } */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: sizeWidth(3),
                    paddingVertical: sizeHeight(0.8),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                        // }}>{item.order_product.length} produk</Text>
                    }}>2 produk</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                    }}>Total Pesanan :
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                            color: color.mainColor,
                            // }}>  Rp. {produk.price !== undefined && rupiah(item.total_pembayaran)}</Text>
                        }}>  Rp. 300.000</Text>
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('DetailOrder', {
                    //     orderId: item.order_id,
                    // })}
                    activeOpacity={0.8}
                    style={{
                        // width: sizeWidth(30),
                        paddingVertical: sizeHeight(0.5),
                        backgroundColor: color.mainColor,
                        alignItems: 'center',
                        borderRadius: 8,
                    }}
                >
                    {/* {
                        item.status_pembayaran === 'pending' ?
                            <Text style={{
                                fontSize: sizeFont(4),
                                color: color.fontWhite,
                            }}>Bayar</Text>
                            : */}
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.fontWhite,
                    }}>Detail</Text>
                    {/* } */}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        marginVertical: sizeHeight(1),
    },
    ListProduk: {
        // borderBottomWidth: 0.5,
        // borderBottomColor: color.border1,
    },
    BoxImage: {
        width: sizeWidth(20),
        height: sizeWidth(20),
    },
});
