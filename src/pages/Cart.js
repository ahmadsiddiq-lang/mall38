import React, { useCallback, useEffect } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Deskripsi from '../components/Cart/Deskripsi';
import Kurir from '../components/Cart/Kurir';
import ListProduk from '../components/Cart/ListProduk';
import MetodeBayar from '../components/Cart/MetodeBayar';
import HeaderCart from '../components/Header/HeaderCart';
import { getIdUser } from '../config/function';
import { getCArt } from '../redux/actions/Cart';

export default function Cart({ navigation }) {

    const dispatch = useDispatch();
    const dataCart = useSelector(state => state.cart.dataCart);

    // console.log(dataCart);

    const hetDataCart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser) {
            dispatch(getCArt(idUser));
        }
    }, [dispatch]);

    useEffect(() => {
        hetDataCart();
        return () => {
            hetDataCart();
        };
    }, [hetDataCart]);

    return (
        <View style={styles.Container}>
            <HeaderCart dataCart={dataCart} navigation={navigation} />
            <StatusBar backgroundColor={color.bgWhite} barStyle="dark-content" />
            <Text style={{
                fontSize: sizeFont(5),
                paddingLeft: sizeWidth(5),
                fontFamily: Poppins.ExtraBold,
                color: color.mainColor,
            }}>My Cart</Text>
            <View style={styles.Content}>
                {dataCart &&
                    <FlatList
                        data={dataCart}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={styles.BoxCard}>
                                <ListProduk item={item} />
                            </View>
                        }
                    />
                }
                <View style={{
                    marginTop: sizeHeight(4),
                }}>
                    {/* <Kurir />
                        <MetodeBayar /> */}
                </View>
            </View>
            <Deskripsi />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    Content: {
        flex: 1,
        paddingTop: sizeHeight(1),
        paddingHorizontal: sizeWidth(5),
        paddingBottom: sizeHeight(28),
    },
    BoxCard: {
        marginVertical: sizeHeight(1.2),
    },
});
