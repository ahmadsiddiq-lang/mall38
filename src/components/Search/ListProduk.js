/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProdukVer from '../CardProdukVer';

export default function ListProduk({ navigation, dataProdukSearch = [], statusData }) {


    const [loading, setloading] = useState(false);
    const [page, setPage] = useState(10);

    const handleScroll = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrolledToBottom = scrolViewHeight + scrollPosition;
        if (isScrolledToBottom >= (contentHeight - 50) && page <= dataProdukSearch.length) {
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
        return data;

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
            {
                statusData ?
                    <FlatList
                        contentContainerStyle={{
                            paddingHorizontal: sizeWidth(2.5),
                        }}
                        numColumns={2}
                        data={formatData(dataProdukSearch, 2)}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                        ListFooterComponent={listFooterComponent}
                        onMomentumScrollEnd={(e) => handleScroll(e)}
                    />
                    :
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: heightPercentageToDP(20),
                    }}>
                        <Text style={{
                            alignItems: 'center',
                            fontSize: sizeFont(4),
                            fontFamily: Poppins.Medium,
                            color: color.fontBlack1,
                        }}>Produk belum tersedia</Text>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        marginTop: sizeHeight(2),
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
