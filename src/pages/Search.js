/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Rekomendasi from '../components/Search/Rekomendasi';
import ListProduk from '../components/Search/ListProduk';
import { getProduk } from '../redux/actions/Produk';
import { useDispatch, useSelector } from 'react-redux';
import Riwayat from '../components/Search/Riwayat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Poppins } from '../assets/fonts';

export default function Search({ navigation }) {

    const dispatch = useDispatch();
    const dataProduk = useSelector(state => state.produk.produk);
    const [dataSearch, setDataSearch] = useState('');
    const [dataProdukSearch, setDataProduk] = useState([]);
    const [statusData, setStatus] = useState(true);
    const [statusRekomet, setStatusRekomen] = useState(false);
    const [loading, setLoading] = useState(true);
    // console.log(dataProduk);

    const getProduks = useCallback(async () => {
        dispatch(getProduk());
    }, [dispatch]);

    const handleSearch = useCallback(() => {
        const data = dataProduk.filter(item => {
            if (item.name !== undefined && dataSearch.length > 0) {
                setLoading(false);
                const x = setTimeout(() => {
                    setLoading(true);
                    clearTimeout(x);
                }, 1000);
                return item.name.toLowerCase().indexOf(dataSearch.toLowerCase()) > -1;
            }
        });
        if (dataSearch.length > 0) {
            if (data.length < 1) {
                setStatus(false);
            } else {
                setStatus(true);
                setDataProduk(data);
            }
            setRiwayat();
            setStatusRekomen(true);
        }
    }, [dataProduk, dataSearch, setRiwayat]);

    const setRiwayat = useCallback(async () => {
        try {
            const myArray = await AsyncStorage.getItem('riwayat');
            let data = myArray !== null ? JSON.parse(myArray) : [];
            const newData = data.filter(item => item !== dataSearch);
            newData.push(dataSearch);
            await AsyncStorage.setItem('riwayat', JSON.stringify(newData));
        } catch (error) {
            // Error saving data
        }
    }, [dataSearch]);

    const handleButtonRiwayat = (value) => {
        setDataSearch(value);
        handleSearch();
        // const data = dataProduk.filter(item => {
        //     if (item.name !== undefined && value.length > 0) {
        //         setLoading(false);
        //         const x = setTimeout(() => {
        //             setLoading(true);
        //             clearTimeout(x);
        //         }, 1000);
        //         return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        //     }
        // });
        // if (value.length > 0) {
        //     if (data.length < 1) {
        //         setStatus(false);
        //     } else {
        //         setStatus(true);
        //         setDataProduk(data);
        //     }
        //     // setRiwayat();
        // }
    };


    useEffect(() => {
        getProduks();
        return () => {
            getProduks();
        };
    }, [getProduks]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <View style={styles.Header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        color={color.fontWhite}
                        size={sizeFont(6.5)}
                    />
                </TouchableOpacity>
                <View style={styles.BoxInput}>
                    <TextInput
                        value={dataSearch}
                        returnKeyType="search"
                        style={styles.Input}
                        placeholder="Cari Produk"
                        onSubmitEditing={() => handleSearch()}
                        onChangeText={(e) => setDataSearch(e)}
                        // autoFocus={true}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            Keyboard.dismiss();
                            handleSearch();
                        }}
                        style={{
                            paddingRight: sizeWidth(3),
                        }}
                    >
                        <Ionicons
                            name="search"
                            color={color.mainColor}
                            size={sizeFont(6.5)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Riwayat
                navigation={navigation}
                handleButtonRiwayat={handleButtonRiwayat}
            />
            {
                statusRekomet ?
                    <View style={{
                        flex: 1,
                    }}>
                        {
                            loading ?
                                <ListProduk
                                    navigation={navigation}
                                    dataProdukSearch={dataProdukSearch}
                                    statusData={statusData}
                                />
                                :
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <ActivityIndicator color={color.mainColor} size="large" />
                                </View>
                        }
                    </View>
                    :
                    <View style={{
                        flex: 1,
                    }}>
                        <Rekomendasi
                            navigation={navigation}
                        />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: color.bgWhite,
        flex: 1,
    },
    Header: {
        backgroundColor: color.mainColor,
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(1.5),
        paddingTop: sizeHeight(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    BoxInput: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.bgWhite,
        marginLeft: sizeWidth(5),
        borderRadius: 8,

    },
    Input: {
        flex: 1,
        paddingHorizontal: sizeWidth(3),
        paddingVertical: sizeHeight(0.8),
        fontSize: sizeFont(3.5),
        fontFamily: Poppins.Regular,
    },
});
