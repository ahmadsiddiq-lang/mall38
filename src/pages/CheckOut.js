/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import Headers from '../components/CheckOut/Headers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT, SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListProduk from '../components/CheckOut/ListProduk';
import Kurir from '../components/CheckOut/Kurir';
import MetodeBayar from '../components/CheckOut/MetodeBayar';
import { getIdUser, openLink, ToasInvalid } from '../config/function';
import { getDataUser } from '../redux/actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { getOngkir } from '../redux/actions/getOngkir';
import BuatPesanan from '../components/CheckOut/BuatPesanan';
import ListKurir from '../components/CheckOut/ListKurir';
import ListMeodeBayar from '../components/CheckOut/ListMeodeBayar';
import { checkOut } from '../redux/actions/CheckOut';
import { getTransaksi } from '../redux/actions/Transaksi';
import { getCArt } from '../redux/actions/Cart';
import { Poppins } from '../assets/fonts';


export default function CheckOut({ navigation, route }) {

    const dataAll = route.params.data !== undefined ? route.params.data : null;

    const dispatch = useDispatch();
    const dataUser = useSelector(state => state.dataUser.dataUser);
    const dataOngkir = useSelector(state => state.dataOngkir.dataOngkir.result);
    const [modalKurir, setKurir] = useState(false);
    // const [loadingData, setLoadingData] = useState(false);
    const [dataKurir, setDataKurir] = useState(null);
    const [modalItem, setModalItem] = useState(null);
    const [dataProduk, setDataProduk] = useState(dataAll);
    const [curentIndex, setCurentIndex] = useState(0);
    const [metodeBayar, setMetodeBayar] = useState({ name: 'BNI', bank: 'bni', image: require('../assets/images/MetodeBayar/bni.png') });

    const [refreshing, setRefreshing] = React.useState(false);
    const [statusButton, setButton] = useState(false);

    const wait = useCallback((timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getOngkirs();
        setDefaultOngkir();
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, [wait, getOngkirs, setDefaultOngkir]);
    // console.log(dataUser);

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

    const handleHargaTotal = useCallback(() => {
        let total = 0;
        dataProduk.forEach(element => {
            total += Number(element.product.price);
        });
        return total;
    }, [dataProduk]);

    const handleTotalHargaBayar = useCallback(() => {
        if (dataKurir !== null) {
            const total = handleHargaTotal() + dataKurir.value;
            return total;
        }
    }, [dataKurir, handleHargaTotal]);

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
        if (dataOngkir !== undefined) {
            const ongkir = dataOngkir[0][0];
            const data = {
                name: ongkir.name,
                service: ongkir.costs[1].service,
                etd: ongkir.costs[1].cost[0].etd,
                value: ongkir.costs[1].cost[0].value,
            };
            setDataKurir(data);
        }
        // console.log(dataOngkir);
    }, [dataOngkir]);

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

    const handlePilihMetodeBayar = useCallback((value, index) => {
        setMetodeBayar(value);
        setCurentIndex(index);
        setKurir(!modalKurir);
    }, [setMetodeBayar, setCurentIndex, modalKurir]);

    const filterdataProduk = useCallback(async () => {
        if (dataProduk !== undefined) {
            let newData = [];
            dataProduk.forEach(item => {
                newData.push({
                    product_id: item.product.id,
                    qty: item.qty,
                });
            });
            return newData;
        }
    }, [dataProduk]);

    const hadnleLoading = () => {
        const x = setTimeout(() => {
            setButton(false);
            return () => {
                clearTimeout(x);
            };
        }, 5000);
    };

    const handleGetTransaksi = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getTransaksi(idUser));
        }
    }, [dispatch]);

    const hetDataCart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser) {
            dispatch(getCArt(idUser));
        }
    }, [dispatch]);

    const handleNavToPembayaran = useCallback(async (value) => {
        const bank = metodeBayar.bank;
        hetDataCart();
        handleGetTransaksi();
        if (bank === 'gopay') {
            navigation.replace('MyTabbar');
            const link = value.actions !== undefined && value.actions[1].url;
            openLink(link);
        } else {
            navigation.replace('Pembayaran', {
                data: value,
            });
        }
    }, [navigation, handleGetTransaksi, metodeBayar, hetDataCart]);

    const handleMetodeBayar = useCallback(async () => {
        setButton(true);
        hadnleLoading();
        const idUser = await getIdUser();
        const amount = handleTotalHargaBayar();
        const bank = metodeBayar.bank;
        const produk = await filterdataProduk();
        console.log(dataUser);
        if (dataUser.user.alamat !== undefined) {
            if (dataUser && idUser && dataKurir && amount && bank && produk) {
                const data = {
                    user_id: idUser,
                    courier: dataKurir.name,
                    service: dataKurir.service,
                    ongkir: dataKurir.value,
                    amount: amount,
                    bank_name: bank,
                    list_product: produk,
                };
                dispatch(checkOut(data, handleNavToPembayaran));
            }
        } else {
            ToasInvalid('Isi alamat terlebih dahulu !');
        }
        // handleNavToPembayaran();
    }, [dataKurir, handleTotalHargaBayar, metodeBayar, filterdataProduk, dispatch, handleNavToPembayaran, dataUser]);

    const handleMOdalItem = (value) => {
        setKurir(!modalKurir);
        setModalItem(value);
    };

    const handleNavToEditAlamat = useCallback(async () => {
        navigation.navigate('EditAlamat', {
            dataUser: dataUser,
            beratProduk: await handleBeratProduk(),
        });
    }, [dataUser, navigation, handleBeratProduk]);

    useEffect(() => {
        handleUser();
        getOngkirs();
        return () => {
            handleUser();
            getOngkirs();
        };
    }, [handleUser, getOngkirs]);

    useEffect(() => {
        setDefaultOngkir();
        return () => {
            setDefaultOngkir();
        };
    }, [setDefaultOngkir]);

    useEffect(() => {
        return () => {
            setDataKurir(null);
            setModalItem(null);
            setMetodeBayar({});
            setDataProduk(null);
        };
    }, []);



    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <Headers navigation={navigation} title={'Check Out'} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        style={{
                            zIndex: 999,
                            marginTop: sizeHeight(15),
                        }}
                        colors={['#689F38', color.mainColor]}
                        refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
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
                                        onPress={() => handleNavToEditAlamat()}
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
                                    dataUser.user.kecamatan !== null ?
                                        <View>
                                            <Text style={{
                                                marginTop: sizeHeight(1),
                                                fontSize: sizeFont(3.3),
                                            }}>[{dataUser.user.phone}]</Text>
                                            <Text style={{
                                                fontSize: sizeFont(3.3),
                                                fontFamily: Poppins.Italic,
                                                color: color.fontBlack1,
                                            }}>{dataUser.user.alamat},</Text>
                                            <Text style={{
                                                fontSize: sizeFont(3.3),
                                            }}>{dataUser.user.kecamatan.nama_kecamatan + ', ' + dataUser.user.kabupaten.nama_kabupaten + ', ' + dataUser.user.provinsi.nama_provinsi}</Text>
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
                            dataOngkir={dataOngkir}
                            dataKurir={dataKurir}
                            handleMOdalItem={handleMOdalItem} />
                        <MetodeBayar
                            metodeBayar={metodeBayar}
                            handleMOdalItem={handleMOdalItem}
                        />
                    </View>
                </View>
            </ScrollView>
            <BuatPesanan
                handleHargaTotal={handleHargaTotal}
                handleTotalHargaBayar={handleTotalHargaBayar}
                handleMetodeBayar={handleMetodeBayar}
                statusButton={statusButton}
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
                        {
                            modalItem === 0 ?
                                <ListKurir
                                    dataOngkir={dataOngkir}
                                    setDataOngkirnew={setDataOngkirnew}
                                />
                                :
                                <ListMeodeBayar
                                    curentIndex={curentIndex}
                                    handlePilihMetodeBayar={handlePilihMetodeBayar}
                                />
                        }
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
