/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { rupiah } from '../../config/function';

export default function Kurir({ handleMOdalItem, dataKurir, dataOngkir }) {

    // console.log(dataKurir);

    return (
        <View style={styles.Container}>
            <Text style={{
                fontSize: sizeFont(3.5),
                fontFamily: Poppins.Medium,
                marginBottom: sizeHeight(1),
            }}>Ongkos Kirim</Text>
            {
                dataOngkir !== undefined ?
                    <TouchableOpacity
                        onPress={() => handleMOdalItem(0)}
                        activeOpacity={0.8}
                        style={styles.Content}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                marginLeft: sizeWidth(2),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3.7),
                                    fontFamily: Poppins.Italic,
                                }}>{dataKurir != null && dataKurir.service}</Text>
                                <Text style={{
                                    fontSize: sizeFont(3.3),
                                    color: color.fontBlack1,
                                }}>{dataKurir != null && dataKurir.name}</Text>
                                <Text style={{
                                    fontSize: sizeFont(3.3),
                                    color: color.fontBlack1,
                                }}>Akan sampai {dataKurir != null && dataKurir.etd.replace('HARI', '')} Hari</Text>
                            </View>
                        </View>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.8),
                                fontFamily: Poppins.Medium,
                                color: color.mainColor,
                            }}>Rp. {dataKurir != null && rupiah(dataKurir.value)}</Text>
                            <Ionicons
                                name="chevron-forward"
                                size={sizeFont(3)}
                                color={color.mainColor}
                            />
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.Content}>
                        <Text>Set Alamat</Text>
                    </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        borderBottomWidth: 1,
        borderColor: color.border2,
        borderRadius: 8,
        marginBottom: sizeHeight(2),
        paddingBottom: sizeHeight(2),
    },
    Content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    BoxImage: {
        backgroundColor: color.mainColor,
        borderRadius: 100,
        width: sizeWidth(15),
        height: sizeWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
