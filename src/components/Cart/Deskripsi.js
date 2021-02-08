import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { getIdUser, rupiah, ToasInvalid } from '../../config/function';
import { chekOut } from '../../redux/actions/Cart';

export default function Deskripsi({ navigation, fixDataCart = [], dataUser, setLoading, hetDataCart }) {

    const dispatch = useDispatch();
    const TotalHargaProduk = useCallback(() => {
        let total = 0;
        fixDataCart.forEach(element => {
            total += (Number(element.product.price) * Number(element.qty));
        });
        return total;
    }, [fixDataCart]);

    const handleProduk = useCallback(() => {
        const newData = [];
        fixDataCart.forEach((element, index) => {
            const total = (Number(element.product.price) * Number(element.qty));
            const berat = (Number(element.product.berat) * Number(element.qty));
            const pv = (Number(element.product.pv) * Number(element.qty));
            const bv = (Number(element.product.bv) * Number(element.qty));
            fixDataCart[index].product.price = total;
            fixDataCart[index].product.berat = berat;
            fixDataCart[index].product.pv = pv;
            fixDataCart[index].product.bv = bv;
            newData.push(fixDataCart[index]);
        });
        return newData;
    }, [fixDataCart]);

    const handleNav = useCallback((dataCheck) => {
        if (fixDataCart.length > 0 && dataUser) {
            setLoading(false);
            navigation.navigate('CheckOut', {
                data: handleProduk(),
                dataUser: dataUser,
                dataCheck: dataCheck,
            });
        } else {
            setLoading(false);
            ToasInvalid('Pilih Produk dahulu !');
        }
    }, [dataUser, fixDataCart, handleProduk, navigation, setLoading]);

    const handleInvalid = useCallback((err) => {
        console.log(err);
        hetDataCart();
        setLoading(false);
        ToasInvalid('Chekout Gagal');
    }, [setLoading, hetDataCart]);

    const buttonCheckOut = useCallback(async () => {
        const idUser = await getIdUser();
        const data = {
            user_id: idUser,
            sub_total_belanja: TotalHargaProduk(),
        };
        // console.log(handleProduk());
        dispatch(chekOut(data, handleNav, handleInvalid));
        setLoading(true);
    }, [TotalHargaProduk, dispatch, handleNav, setLoading, handleInvalid]);

    return (
        <View style={styles.Container}>
            <View style={styles.Item}>
                <Text style={styles.TextTitle}>Sub Total</Text>
                <Text style={styles.TextItem}>Rp. {rupiah(TotalHargaProduk())}</Text>
            </View>
            <View style={{
                marginTop: sizeHeight(3),
            }}>
                <TouchableOpacity
                    onPress={() => buttonCheckOut()}
                    activeOpacity={0.8}
                    style={styles.BtnBuy}
                >
                    <Text style={{
                        fontSize: sizeFont(4),
                        fontFamily: Poppins.Bold,
                        color: color.fontWhite,
                    }}>CHECK OUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        borderTopWidth: 1,
        borderTopColor: color.border2,
        position: 'absolute',
        bottom: 0,
        width: SCREEN_WIDTH,
        backgroundColor: color.bgWhite,
        paddingTop: sizeHeight(1),
        paddingHorizontal: sizeWidth(8),
        paddingBottom: sizeHeight(1.5),
    },
    Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TextTitle: {
        fontSize: sizeFont(3.8),
        fontFamily: Poppins.Medium,
        color: color.fontBlack1,
    },
    TextItem: {
        fontSize: sizeFont(3.8),
        fontFamily: Poppins.Medium,
        color: color.mainColor,
    },
    BtnBuy: {
        backgroundColor: color.mainColor,
        alignItems: 'center',
        paddingVertical: sizeHeight(0.8),
        borderRadius: 8,
    },
});
