/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight } from '../../assets/responsive';
import CardProdukVer from '../CardProdukVer';
export default function ListProduk({ navigation, dataProdukCategori }) {

    const [loading, setloading] = useState(false);
    const [page, setPage] = useState(10);

    const handleScroll = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrolledToBottom = scrolViewHeight + scrollPosition;
        if (isScrolledToBottom >= contentHeight && page <= dataProdukCategori.product.length) {
            setPage(page + 10);
            setloading(true);
        } else {
            setloading(false);
        }
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
                dataProdukCategori.product.length > 0 ?
                    <FlatList
                        numColumns={2}
                        data={dataProdukCategori.product}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (index + 1 <= page) {
                                return (
                                    <CardProdukVer item={item} />
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
            }
        </View>
    );
}
