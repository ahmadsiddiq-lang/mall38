/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { Poppins } from '../../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProdukVer from '../CardProdukVer';

export default function Rekomendasi({ navigation }) {

    const dataProduk = useSelector(state => state.produk.produk);
    const [page, setPage] = useState(10);


    const formatData = (data, colum) => {
        const totalRows = Math.floor(data.length / colum);
        let totalLastRows = data.length - (totalRows * colum);

        while (totalLastRows !== 0 && totalLastRows !== colum) {
            data.push({ 'key': 'blank', 'empty': true });
            totalLastRows++;
        }
        return data;

    };

    const renderItem = ({ item, index }) => {
        if (index + 1 <= page) {
            if (item.empty) {
                return (
                    <View style={styles.itemInvisible} />
                );
            }
            return (
                <CardProdukVer navigation={navigation} item={item} />
            );
        }
    };

    return (
        <View style={styles.Container}>
            <Text style={{
                fontSize: sizeFont(4),
                marginLeft: sizeWidth(5),
                fontFamily: Poppins.Medium,
                marginVertical: heightPercentageToDP(1),
            }}>Rekomendasi Pencarian</Text>
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: sizeWidth(3),
                }}
                numColumns={2}
                data={formatData(dataProduk.slice(0, 16), 2)}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        marginTop: sizeHeight(1),
        flex: 1,
    },
    itemInvisible: {
        flex: 1,
        borderRadius: 8,
        marginHorizontal: sizeWidth(2.5),
        marginVertical: sizeHeight(2),
        paddingBottom: sizeHeight(6),
        backgroundColor: 'transparent',
    },
});
