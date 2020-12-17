/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProdukVer from '../CardProdukVer';
export default function ListProduk({ navigation, dataProdukCategori }) {

    const [loading, setloading] = useState(false);
    const [page, setPage] = useState(10);

    const handleScroll = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrolledToBottom = scrolViewHeight + scrollPosition;
        if (isScrolledToBottom >= (contentHeight - 50) && page <= dataProdukCategori.product.length) {
            setPage(page + 10);
            setloading(true);
        } else {
            setloading(false);
        }
    };

    const formatData = (data, colum) => {
        const totalRows = Math.floor(data.length / colum);
        let totalLastRows = data.length - (totalRows * colum);

        while (totalLastRows !== 0 && totalLastRows !== colum) {
            data.push({ 'key': 'blank', 'empty': true });
            totalLastRows++;
        }
        // return data;
        // console.log(data);
        return data;

    };

    const onPressBeli = () => {
        console.log('Beli');
    };

    const listFooterComponent = () => {
        return (
            <View>
                {
                    loading &&
                    <ActivityIndicator
                        size={'large'}
                        color={color.mainColor}
                    />
                }
            </View>
        );
    };

    return (
        <View style={{
            flex: 1,
        }}>
            {
                dataProdukCategori.product ?
                    dataProdukCategori.product.length > 0 ?
                        <FlatList
                            numColumns={2}
                            data={formatData(dataProdukCategori.product, 2)}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                if (index + 1 <= page) {
                                    if (item.empty) {
                                        return (
                                            <View style={styles.itemInvisible} />
                                        );
                                    }
                                    return (
                                        <CardProdukVer navigation={navigation} onPressBeli={onPressBeli} item={item} />
                                    );
                                }
                            }}
                            ListFooterComponent={listFooterComponent}
                            onMomentumScrollEnd={(e) => handleScroll(e)}
                        />
                        :
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontSize: sizeFont(5),
                                color: color.fontBlack1,
                            }}>Produk belum tersedia</Text>
                        </View>
                    :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator
                            size="large"
                            color={color.mainColor}
                        />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    itemInvisible: {
        flex: 1,
        borderRadius: 8,
        marginHorizontal: sizeWidth(2.5),
        marginVertical: sizeHeight(2),
        paddingBottom: sizeHeight(6),
        backgroundColor: 'transparent',
    },
});
