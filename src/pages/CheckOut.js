/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import Headers from '../components/Header/Headers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT, SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListProduk from '../components/CheckOut/ListProduk';
import Kurir from '../components/CheckOut/Kurir';
import MetodeBayar from '../components/CheckOut/MetodeBayar';
import { getIdUser, rupiah } from '../config/function';
import { getDataUser } from '../redux/actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { getOngkir } from '../redux/actions/getOngkir';
import { Poppins } from '../assets/fonts';
import BuatPesanan from '../components/CheckOut/BuatPesanan';


export default function CheckOut({ navigation, route }) {

    const dispatch = useDispatch();
    const dataUser = useSelector(state => state.dataUser.dataUser.user);
    const dataOngkir = useSelector(state => state.dataOngkir.dataOngkir.result);
    const [modalKurir, setKurir] = useState(false);
    const [dataKurir, setDataKurir] = useState(null);

    const dataProduk = route.params.data;
    // console.log(dataOngkir);

    const handleUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getDataUser(idUser));
        }
    }, [dispatch]);

    const handleBeratProduk = useCallback(async () => {
        let berat = 0;
        dataProduk.forEach(element => {
            berat += Number(element.product.berat);
        });
        return berat;
    }, [dataProduk]);

    const handleHargaTotal = () => {
        let total = 0;
        dataProduk.forEach(element => {
            total += Number(element.product.price);
        });
        return total;
    };

    const getOngkirs = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            const data = new FormData();
            data.append('user_id', idUser);
            data.append('weight', await handleBeratProduk());
            dispatch(getOngkir(data));
        }
    }, [dispatch, handleBeratProduk]);

    const setDefaultOngkir = useCallback(async () => {
        if (dataOngkir !== undefined && dataKurir == null) {
            const ongkir = dataOngkir[0][0];
            const data = {
                name: ongkir.name,
                service: ongkir.costs[1].service,
                etd: ongkir.costs[1].cost[0].etd,
                value: ongkir.costs[1].cost[0].value,
            };
            setDataKurir(data);
            // console.log(data);
        }
    }, [dataOngkir, dataKurir]);

    const setDataOngkirnew = useCallback(async (dataParams, name) => {
        if (dataParams !== undefined) {
            const data = {
                name: name,
                service: dataParams.service,
                etd: dataParams.cost[0].etd,
                value: dataParams.cost[0].value,
            };
            setDataKurir(data);
            setKurir(!modalKurir);
            // console.log(data);
        }
    }, [modalKurir]);

    useEffect(() => {
        handleUser();
        getOngkirs();
    }, [handleUser, getOngkirs]);

    useEffect(() => {
        setDefaultOngkir();
    }, [setDefaultOngkir]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <Headers navigation={navigation} title={'Check Out'} />
            <ScrollView>
                <View>
                    <View style={styles.BoxAlamat}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Ionicons name="location-outline" color={color.mainColor} size={sizeFont(6)} />
                            <View style={{
                                marginLeft: sizeWidth(3),
                                flex: 1,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Text>Alamat Pengiriman</Text>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.BtnBack}
                                    >
                                        <FontAwesome5
                                            name="edit"
                                            size={sizeFont(4.5)}
                                            color={color.mainColor}
                                            light
                                        />
                                    </TouchableOpacity>
                                </View>
                                {
                                    dataUser &&
                                        dataUser.provinsi !== null ?
                                        <View>
                                            <Text style={{
                                                marginTop: sizeHeight(1),
                                                fontSize: sizeFont(3.3),
                                            }}>[{dataUser.phone}]</Text>
                                            <Text style={{
                                                fontSize: sizeFont(3.3),
                                            }}>{dataUser.alamat + ', ' + dataUser.kecamatan.nama_kecamatan + ', ' + dataUser.kabupaten.nama_kabupaten + ', ' + dataUser.provinsi.nama_provinsi}</Text>
                                        </View>
                                        :
                                        <Text style={{
                                            marginTop: sizeHeight(1),
                                            fontSize: sizeFont(3.3),
                                        }}>Pilih Alamat</Text>

                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.ContentItem}>
                        {
                            dataProduk.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <ListProduk item={item} />
                                    </View>
                                );
                            })
                        }
                    </View>
                    <View style={styles.ContentItem}>
                        <Kurir
                            dataKurir={dataKurir}
                            setKurir={setKurir} />
                        <MetodeBayar />
                    </View>
                </View>
            </ScrollView>
            <BuatPesanan
                dataKurir={dataKurir}
                handleHargaTotal={handleHargaTotal}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalKurir}
                onRequestClose={() => {
                    setKurir(!modalKurir);
                }}
            >
                <View style={styles.centeredView}>
                    <TouchableOpacity
                        onPress={() => setKurir(!modalKurir)}
                        activeOpacity={0.8}
                        style={styles.modalView} />
                    <View style={styles.ContentModal}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.BtnClose}
                            onPress={() => setKurir(!modalKurir)}
                        >
                            <FontAwesome5
                                name="times-circle"
                                size={sizeFont(5)}
                                color={color.mainColor}
                                light
                            />
                        </TouchableOpacity>
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
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        elevation: 2,
    },
    BoxAlamat: {
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(2),
        backgroundColor: color.bgWhite,
        marginBottom: sizeHeight(0.5),
    },
    ContentItem: {
        marginVertical: sizeHeight(0.5),
        backgroundColor: color.bgWhite,
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(2),
    },
    modalView: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    ContentModal: {
        position: 'absolute',
        height: sizeHeight(80),
        backgroundColor: color.bgWhite,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        bottom: 0,
        width: SCREEN_WIDTH,
    },
    BtnClose: {
        position: 'absolute',
        right: sizeWidth(5),
        top: sizeHeight(3),
        zIndex: 1,
    },
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
