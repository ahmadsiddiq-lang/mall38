/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
// import Rekomendasi from '../components/Search/Rekomendasi';
import ListProduk from '../components/Search/ListProduk';
import { getProduk } from '../redux/actions/Produk';
import { useDispatch, useSelector } from 'react-redux';

export default function Search({ navigation }) {

    const dispatch = useDispatch();
    const dataProduk = useSelector(state => state.produk.produk);
    const [dataSearch, setDataSearch] = useState('');
    const [dataProdukSearch, setDataProduk] = useState([]);
    // console.log(dataProduk);

    const getProduks = useCallback(async () => {
        dispatch(getProduk());
    }, [dispatch]);

    const handleSearch = useCallback(() => {
        const data = dataProduk.filter(item => {
            if (item.name !== undefined && dataSearch.length > 0) {
                return item.name.toLowerCase().indexOf(dataSearch) > -1;
            }
        });
        setDataProduk(data);
    }, [dataProduk, dataSearch]);


    useEffect(() => {
        getProduks();
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
                <TextInput
                    returnKeyType="search"
                    style={styles.Input}
                    placeholder="Cari Produk"
                    onSubmitEditing={() => handleSearch()}
                    onChangeText={(e) => setDataSearch(e)}
                    autoFocus={true}
                    autoCapitalize="none"
                />
            </View>
            {/* <Rekomendasi
                navigation={navigation}
            /> */}
            <View style={{
                flex: 1,
            }}>
                <ListProduk
                    navigation={navigation}
                    dataProdukSearch={dataProdukSearch}
                />
            </View>
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
    Input: {
        backgroundColor: color.bgWhite,
        flex: 1,
        marginLeft: sizeWidth(5),
        borderRadius: 8,
        paddingHorizontal: sizeWidth(3),
        paddingVertical: sizeHeight(0.8),
        fontSize: sizeFont(3.5),
    },
});
