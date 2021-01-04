import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { color } from '../../assets/colors/Index';
import { sizeHeight, sizeWidth } from '../../assets/responsive';
import { getIdUser } from '../../config/function';
import { addCart } from '../../redux/actions/Cart';
import CardProdukVer from '../CardProdukVer';
export default function ListProduk({ navigation, dataProduk, onRefresh, refreshing }) {

    const dispatch = useDispatch();

    const [loading, setloading] = useState(false);
    const [page, setPage] = useState(10);

    const handleScroll = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrolledToBottom = scrolViewHeight + scrollPosition;
        if (isScrolledToBottom >= (contentHeight - 50) && page <= dataProduk.length) {
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

    const onPressBeli = useCallback(async (item) => {
        const idUser = await getIdUser();
        const idProduk = item.id;
        const data = {
            user_id: idUser,
            product_id: idProduk,
            qty: 1,
        };
        if (data.product_id && data.user_id) {
            dispatch(addCart(data));
            navigation.navigate('Cart');
        } else {
            navigation.navigate('Login');
        }
    }, [dispatch, navigation]);


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
        <View style={styles.Container}>
            {
                dataProduk &&
                <FlatList
                    numColumns={2}
                    data={formatData(dataProduk, 2)}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        if (index + 1 <= page) {
                            if (item.empty) {
                                return (
                                    <View style={styles.itemInvisible} />
                                );
                            }
                            return (
                                <CardProdukVer navigation={navigation} item={item} onPressBeli={onPressBeli} />
                            );
                        }
                    }}
                    ListFooterComponent={listFooterComponent}
                    onMomentumScrollEnd={(e) => handleScroll(e)}
                    refreshControl={
                        <RefreshControl
                            colors={[color.mainColor, '#689F38']}
                            refreshing={refreshing}
                            onRefresh={onRefresh} />
                    }
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        paddingBottom: sizeHeight(8),
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
