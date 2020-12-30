/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Alamat from '../components/DetailOrder/Alamat';
import CardProduk from '../components/DetailOrder/CardProduk';
import InfoPengiriman from '../components/DetailOrder/InfoPengiriman';
import Headers from '../components/Header/Headers';
import MetodeBayar from '../components/DetailOrder/MetodeBayar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { detailOrder } from '../redux/actions/DetailOrder';
import { rupiah, objekEmpty } from '../config/function';

export default function DetailOrder({ navigation, route }) {

    const dispatch = useDispatch();
    const dataDetailOrder = useSelector(state => state.detailOrder.detailOrder);

    // console.log(objekEmpty(dataDetailOrde));

    const getDataDetailOrder = useCallback(async () => {
        const idOrer = route.params.orderId;
        if (idOrer) {
            dispatch(detailOrder(idOrer));
        }
    }, [dispatch, route]);

    useEffect(() => {
        getDataDetailOrder();
    }, [getDataDetailOrder]);


    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={'Detail Pesanan'} />
            <ScrollView>
                {
                    objekEmpty(dataDetailOrder) &&
                    <Alamat
                        dataDetailOrder={dataDetailOrder}
                    />
                }
                <InfoPengiriman />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: color.bgWhite,
                    paddingVertical: sizeHeight(1),
                    paddingHorizontal: sizeWidth(5),
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
                    }}>Pending</Text>
                </View>
                {
                    objekEmpty(dataDetailOrder) &&
                    dataDetailOrder.order_product.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={styles.BoxCard}>
                                <CardProduk
                                    navigation={navigation}
                                    item={item}
                                />
                            </View>
                        );
                    })
                }
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: sizeWidth(5),
                    backgroundColor: color.bgWhite,
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                    }}>Ongkir</Text>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        fontFamily: Poppins.Medium,
                        color: color.mainColor,
                    }}>  Rp. {
                            objekEmpty(dataDetailOrder) &&
                            rupiah(dataDetailOrder.ongkir)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: sizeWidth(5),
                    backgroundColor: color.bgWhite,
                    paddingBottom: sizeHeight(1),
                    marginBottom: sizeHeight(1),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                        color: color.fontBlack1,
                    }}>{objekEmpty(dataDetailOrder) && dataDetailOrder.order_product.length} produk</Text>
                    <Text style={{
                        fontSize: sizeFont(3.3),
                    }}>Total Pesanan :
                    <Text style={{
                            fontSize: sizeFont(4),
                            fontFamily: Poppins.Medium,
                            color: color.mainColor,
                        }}>  Rp. {objekEmpty(dataDetailOrder) &&
                            rupiah(dataDetailOrder.total_pembayaran)}</Text>
                    </Text>
                </View>
                {
                    objekEmpty(dataDetailOrder) &&
                    <MetodeBayar
                        dataDetailOrder={dataDetailOrder}
                    />
                }
            </ScrollView>
            <View style={{
                paddingVertical: sizeHeight(2),
                paddingHorizontal: sizeWidth(5),
                backgroundColor: color.bgWhite,
                borderTopWidth: 1,
                borderTopColor: color.border2,
            }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        paddingVertical: sizeHeight(1),
                        borderRadius: 8,
                        alignItems: 'center',
                        backgroundColor: color.mainColor,
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Ionicons name="logo-whatsapp" color={color.fontWhite} size={sizeFont(6)} />
                    <Text style={{
                        color: color.fontWhite,
                        fontSize: sizeFont(3.5),
                        marginLeft: sizeWidth(2),
                        fontFamily: Poppins.Medium,
                    }}>Chat Penjual</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    BoxCard: {
        backgroundColor: color.bgWhite,
        paddingHorizontal: sizeWidth(5),
    },
});
