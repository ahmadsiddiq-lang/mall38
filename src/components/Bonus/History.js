/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { rupiah } from '../../config/function';

export default function History({ dataHostory, pageStatus }) {

    // console.log(dataHostory);

    const TotalBV = () => {
        if (dataHostory != null) {
            let total = 0;
            dataHostory.forEach(element => {
                total += element.bonus_passive;
            });
            return total;
        }
    };

    return (
        <View style={styles.Container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: sizeWidth(5),
                marginVertical: sizeHeight(2),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                }}>History Bonus</Text>
                {
                    pageStatus === 0 &&
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                        color: color.mainColor,
                    }}>Total Bonus Pasive: {dataHostory !== null ? rupiah(TotalBV()) : '0'}</Text>
                }
            </View>
            <ScrollView>
                <View style={{
                    marginHorizontal: sizeWidth(5),
                }}>
                    {
                        dataHostory != null ?
                            dataHostory.map((item, index) => cardHostory({ item, index, pageStatus }))
                            :
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: sizeHeight(17),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                    color: color.fontBlack1,
                                }}>Hostory belum ada</Text>
                            </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const cardHostory = ({ item, index, pageStatus }) => {
    if (pageStatus === 1) {
        if (item.bonus_active > 0) {
            return (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        borderBottomWidth: 1,
                        borderBottomColor: color.border2,
                        paddingBottom: sizeHeight(1.5),
                        marginBottom: sizeHeight(1.5),
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../../assets/images/pageAkun/Wallet.png')}
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                        />
                        <View style={{
                            marginLeft: sizeWidth(3),
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack,
                            }}>Bonus Active</Text>
                            <Text style={{
                                fontSize: sizeFont(3),
                                color: color.fontBlack1,
                            }}>{item.tanggal_pembayaran}</Text>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                        color: color.mainColor,
                    }}>{rupiah(item.bonus_active)}</Text>
                </View>
            );
        }
    } else {
        if (item.bonus_passive > 0) {
            return (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        borderBottomWidth: 1,
                        borderBottomColor: color.border2,
                        paddingBottom: sizeHeight(1.5),
                        marginBottom: sizeHeight(1.5),
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../../assets/images/pageAkun/Wallet.png')}
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                        />
                        <View style={{
                            marginLeft: sizeWidth(3),
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack,
                            }}>Bonus Active {item.from}</Text>
                            <Text style={{
                                fontSize: sizeFont(3),
                                color: color.fontBlack1,
                            }}>{item.tanggal_pembayaran}</Text>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                        color: color.mainColor,
                    }}>{rupiah(item.bonus_passive)}</Text>
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
});
