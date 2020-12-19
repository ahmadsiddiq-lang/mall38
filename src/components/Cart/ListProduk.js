/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DefaultTitle } from '../DefaultText';
import { Poppins } from '../../assets/fonts';
import { rupiah } from '../../config/function';

export default function ListProduk({ item }) {
    return (
        <View style={styles.Container}>
            <View style={styles.BoxImage}>
                {
                    item.product.image ?
                        <Image
                            style={styles.Image}
                            // resizeMode="contain"
                            resizeMethod="auto"
                            source={{ uri: item.product.image }} />
                        :
                        <Image
                            style={styles.Image}
                            // resizeMode="contain"
                            resizeMethod="auto"
                            source={require('../../assets/images/Produk/imagedefault.png')} />

                }
            </View>
            <View style={styles.BoxRight}>
                <View style={styles.Item}>
                    <View style={{
                        width: '90%',
                    }}>
                        <Text numberOfLines={1} style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                        }}>{item.product ? item.product.name : 'Nama barang'}</Text>
                        <Text style={{
                            marginTop: sizeHeight(0.3),
                            fontSize: sizeFont(3),
                            color: color.fontBlack1,
                        }}>Category : {item.product ? item.product.category : 'not found'}</Text>
                        <Text style={{
                            fontSize: sizeFont(3.8),
                            color: color.mainColor,
                        }}>Rp. {item.product ? rupiah(item.product.price) : 'not found'}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={styles.BoxQty}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    paddingRight: sizeWidth(4),
                                }}
                            >
                                <Ionicons name="remove-circle" size={sizeFont(5)} color={color.mainColor} />
                            </TouchableOpacity>
                            <Text>1</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    paddingLeft: sizeWidth(4),
                                }}
                            >
                                <Ionicons name="add-circle" size={sizeFont(5)} color={color.mainColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.Trash}>
                    <Ionicons name="trash-bin" size={sizeFont(5)} color={color.mainColor} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        borderWidth: 2,
        borderColor: color.border3,
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    BoxImage: {
        // borderWidth: 1,
        width: sizeWidth(28),
        height: sizeWidth(28),
    },
    Image: {
        width: '100%',
        height: '100%',
    },
    BoxRight: {
        // borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: sizeHeight(1),
        paddingHorizontal: sizeWidth(2),
    },
    Item: {
        // borderWidth: 1,
        flex: 1,
    },
    Trash: {
        position: 'absolute',
        right: sizeWidth(2),
        top: sizeHeight(1),
    },
    BoxQty: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        justifyContent: 'flex-end',
    },
});
