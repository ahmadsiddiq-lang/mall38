/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { rupiah } from '../../config/function';

export default function ListKurir({ dataOngkir, setDataOngkirnew }) {
    return (
        <View>
            <Text style={{
                fontSize: sizeFont(4),
                fontFamily: Poppins.Medium,
                marginLeft: sizeWidth(5),
                marginVertical: sizeHeight(3),
            }}>Pilih Kurir</Text>
            <ScrollView>
                <View style={styles.Content}>
                    {dataOngkir !== undefined ?
                        dataOngkir.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={styles.ListKurir}
                                >
                                    <Text style={{
                                        fontSize: sizeFont(3.5),
                                        fontFamily: Poppins.Medium,
                                    }}>{item[0].name}</Text>
                                    {
                                        item[0].costs.map((subItem, subIndex) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setDataOngkirnew(subItem, item[0].name);
                                                    }}
                                                    key={subIndex}
                                                    activeOpacity={0.8}
                                                    style={styles.BoxList}>
                                                    <View>
                                                        <Text style={{
                                                            fontSize: sizeFont(3.3),
                                                            fontFamily: Poppins.Medium,
                                                        }}>{subItem.service}</Text>
                                                        <View>
                                                            <Text style={{
                                                                fontSize: sizeFont(3.3),
                                                                color: color.fontBlack1,
                                                            }}>Ongkos Kirim</Text>
                                                            <Text style={{
                                                                fontSize: sizeFont(3.3),
                                                                color: color.fontBlack1,
                                                            }}>Akan diterima dalam {subItem.cost[0].etd.replace('HARI', '')} Hari</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        alignItems: 'flex-end',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Text style={{
                                                            fontSize: sizeFont(3.5),
                                                            fontFamily: Poppins.Medium,
                                                            color: color.mainColor,
                                                        }}>Rp. {rupiah(subItem.cost[0].value)}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })
                                    }
                                </View>
                            );
                        })
                        :
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <ActivityIndicator size="large" color={color.mainColor} />
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Content: {
        marginBottom: sizeHeight(8),
    },
    ListKurir: {
        marginLeft: sizeWidth(5),
        borderBottomWidth: 1,
        borderColor: color.border1,
        marginBottom: sizeHeight(2),
        paddingBottom: sizeHeight(1),
    },
    BoxList: {
        flexDirection: 'row',
        marginHorizontal: sizeWidth(5),
        marginTop: sizeHeight(1),
        justifyContent: 'space-between',
    },
});
