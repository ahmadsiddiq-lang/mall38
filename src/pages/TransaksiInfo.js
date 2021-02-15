/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Header from '../components/Header/Home';
import CardProduk from '../components/TransaksiInfo/CardProduk';
import TopBar from '../components/TransaksiInfo/TopBar';
import { getIdUser } from '../config/function';
import { setEdge } from '../redux/actions/edgeOrder';
import { getTransaksi } from '../redux/actions/Transaksi';

export default function Transaksi({ navigation }) {

    const dispatch = useDispatch();
    const dataNewOrder = useSelector(state => state.dataTransaksi.dataTransaksi.order);
    const [dataTransaksi, setDataTransaksi] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    // console.log(dataNewOrder);
    const handleGetTransaksi = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getTransaksi(idUser));
        }
    }, [dispatch]);

    const handleTabbarFilter = (value) => {
        setDataTransaksi(null);
        const x = setTimeout(() => {
            if (dataNewOrder !== undefined) {
                if (value === 'Semua') {
                    setDataTransaksi(dataNewOrder.reverse());
                    handleGetTransaksi();
                } else if (value === 'delivery') {
                    const data = dataNewOrder.filter(item => item.status_pengiriman === value);
                    setDataTransaksi(data.reverse());
                } else {
                    const data = dataNewOrder.filter(item => item.status_pembayaran === value);
                    setDataTransaksi(data.reverse());
                }
            }
            return () => {
                clearTimeout(x);
            };
        }, 1000);
    };

    const wait = useCallback((timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        handleGetTransaksi();
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, [wait, handleGetTransaksi]);


    const handleCircle = React.useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null && dataTransaksi !== null) {
            const data = dataTransaksi.filter(item => item.status_pembayaran === 'pending');
            if (data.length > 0) {
                dispatch(setEdge(data));
            }
        }
    }, [dataTransaksi, dispatch]);

    useEffect(() => {
        handleGetTransaksi();
        handleCircle();
        return () => {
            handleGetTransaksi();
            handleCircle();
        };
    }, [handleGetTransaksi, handleCircle]);

    useEffect(() => {
        if (dataNewOrder) {
            setDataTransaksi(dataNewOrder.reverse());
        }
        return () => {
            setDataTransaksi(null);
        };
    }, []);

    return (
        <View style={styles.Container}>
            <Header navigation={navigation} />
            <TopBar
                handleTabbarFilter={handleTabbarFilter}
            />
            <View style={styles.Content}>
                {
                    dataTransaksi !== null && dataTransaksi !== undefined ?
                        dataTransaksi.length > 0 ?
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        colors={['#689F38', color.mainColor]}
                                        refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            >
                                {
                                    dataTransaksi.map((item, index) => {
                                        return (
                                            <View key={index} style={styles.BoxCard}>
                                                <CardProduk
                                                    navigation={navigation}
                                                    item={item}
                                                />
                                            </View>
                                        );
                                    })

                                }
                            </ScrollView>
                            :
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(4),
                                    color: color.fontBlack1,
                                }}>Tidak ada pesanan</Text>
                            </View>
                        :
                        <View style={{
                            flex: 1,
                            backgroundColor: color.bgWhite,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <ActivityIndicator size="large" color={color.mainColor} />
                        </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    Content: {
        flex: 1,
    },
    BoxCard: {
        backgroundColor: color.bgWhite,
        marginBottom: sizeHeight(1),
        paddingHorizontal: sizeWidth(5),
    },
});
