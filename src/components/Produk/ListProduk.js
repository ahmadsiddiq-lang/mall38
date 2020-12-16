import React, { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import CardProdukVer from '../CardProdukVer';
export default function ListProduk({ navigation, dataProduk }) {

    const [loading, setloading] = useState(false);
    const [page, setPage] = useState(10);

    const handleScroll = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrolledToBottom = scrolViewHeight + scrollPosition;
        if (isScrolledToBottom >= contentHeight && page <= dataProduk.length) {
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
        <View>
            {
                dataProduk &&
                <FlatList
                    numColumns={2}
                    data={dataProduk}
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
            }
        </View>
    );
}
