/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { rupiah } from '../../config/function';
import { DefaultText } from '../DefaultText';
import Star from '../Star';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64';

export default function Deskripsi({ detailProduk }) {


    const description = detailProduk.description !== undefined ? detailProduk.description : null;
    // console.log(detailProduk);

    const LinkDetail = (item) => {
        if (item.id) {
            const id = base64.encode(item.id.toString());
            const toUpper = item.name.toLowerCase();
            const name = toUpper.replace(/\s/g, '-');
            Linking.openURL(`https://mall38.com/product/${name}/${id}`);

        }
    };

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
                <View style={{
                    marginTop: sizeHeight(1),
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>BV</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                        }}>{rupiah(detailProduk.bv)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>PV</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                        }}>{rupiah(detailProduk.pv)}</Text>
                    </View>
                </View>
                <View style={{
                    borderWidth: 2,
                    borderColor: color.mainColor,
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginTop: sizeHeight(2),
                }}>
                    <View style={{
                        backgroundColor: color.mainColor,
                        paddingHorizontal: sizeWidth(3),
                        paddingVertical: sizeHeight(0.5),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontWhite,
                        }}>Bonus Active</Text>
                    </View>
                    <View style={{
                        backgroundColor: color.mainColor2,
                        paddingHorizontal: sizeWidth(3),
                        paddingVertical: sizeHeight(0.5),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image style={{
                                resizeMode: 'contain',
                                width: sizeWidth(8),
                                height: sizeWidth(8),
                            }} source={require('../../assets/images/detailProduk/Exclusive.png')} />
                            <Text style={{
                                marginLeft: sizeWidth(3),
                                marginTop: sizeHeight(1),
                                fontSize: sizeFont(3.5),
                            }}>Exclusive</Text>
                        </View>
                        <Text style={{
                            marginTop: sizeHeight(1),
                            fontSize: sizeFont(3.5),
                            marginLeft: sizeWidth(6),
                        }}>{detailProduk.exclusive_persen}</Text>
                        <Text style={{
                            marginTop: sizeHeight(1),
                            fontSize: sizeFont(3.5),
                        }}>{rupiah(detailProduk.exclusive)}</Text>
                    </View>
                    <View style={{
                        paddingHorizontal: sizeWidth(3),
                        paddingVertical: sizeHeight(0.5),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image style={{
                                resizeMode: 'contain',
                                width: sizeWidth(8),
                                height: sizeWidth(8),
                            }} source={require('../../assets/images/detailProduk/Premium.png')} />
                            <Text style={{
                                marginLeft: sizeWidth(3),
                                marginTop: sizeHeight(1),
                                fontSize: sizeFont(3.5),
                            }}>Premium</Text>
                        </View>
                        <Text style={{
                            marginTop: sizeHeight(1),
                            fontSize: sizeFont(3.5),
                            marginLeft: sizeWidth(6),
                        }}>{detailProduk.premium_persen}</Text>
                        <Text style={{
                            marginTop: sizeHeight(1),
                            fontSize: sizeFont(3.5),
                        }}>{rupiah(detailProduk.premium)}</Text>
                    </View>
                    <View style={{
                        backgroundColor: color.mainColor2,
                        paddingHorizontal: sizeWidth(3),
                        paddingVertical: sizeHeight(0.5),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image style={{
                                resizeMode: 'contain',
                                width: sizeWidth(8),
                                height: sizeWidth(8),
                            }} source={require('../../assets/images/detailProduk/Dropshipper.png')} />
                            <Text style={{
                                marginLeft: sizeWidth(3),
                                marginTop: sizeHeight(1),
                                fontSize: sizeFont(3.5),
                            }}>Dropshipper</Text>
                        </View>
                        <Text style={{
                            marginTop: sizeHeight(1),
                            fontSize: sizeFont(3.5),
                        }}>{detailProduk.dropshipper_persen}</Text>
                        <Text style={{
                            marginTop: sizeHeight(1),
                            fontSize: sizeFont(3.5),
                        }}>{rupiah(detailProduk.dropshipper)}</Text>
                    </View>
                </View>
            </View>
            {
                description !== null ?
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
                            // position:'absolute',
                        }}>
                            {/* <WebView
                        originWhitelist={['*']}
                        source={{ html: detailProduk.short_desc }}
                        style={{
                            width: sizeWidth(90),
                            height: sizeHeight(15),
                            borderWidth: 1,
                        }}
                    /> */}
                            <DefaultText>{description}</DefaultText>
                        </View>
                    </View>
                    :
                    <View style={styles.BoxText}>
                        <Text
                            onPress={() => LinkDetail(detailProduk)}
                            style={{
                                fontSize: sizeFont(3.5),
                                fontFamily: Poppins.Medium,
                                textAlign: 'center',
                                color: color.mainColor,
                            }}>Lihat Detail</Text>
                    </View>
            }
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
