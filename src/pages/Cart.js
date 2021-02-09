/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, FlatList, Image, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Deskripsi from '../components/Cart/Deskripsi';
// import Kurir from '../components/Cart/Kurir';
// import MetodeBayar from '../components/Cart/MetodeBayar';
import ListProduk from '../components/Cart/ListProduk';
import HeaderCart from '../components/Header/HeaderCart';
import { getIdUser } from '../config/function';
import { deleteProdukCart, getCArt } from '../redux/actions/Cart';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDataUser } from '../redux/actions/User';
import { heightPercentageToDP } from 'react-native-responsive-screen';


export default function Cart({ navigation }) {
    const dispatch = useDispatch();
    const dataCart = useSelector(state => state.cart.dataCart);
    const dataUser = useSelector(state => state.dataUser.dataUser);
    const [toggleCheckBox, setToggleCheckBox] = useState(true);
    const [loading, setLoading] = useState(false);
    const [dataCartState, setDataCart] = useState([]);
    const [fixDataCart, setFixDataCart] = useState([]);
    // console.log(dataCartState);

    const handleCechboxItem = (id) => {
        const dataFromState = dataCartState;
        const dataIndex = dataFromState.findIndex(cart => cart.id === id);
        dataFromState[dataIndex].checkbox = !dataFromState[dataIndex].checkbox;
        const dataNew = dataFromState;
        // console.log(dataCartState);
        setDataCart([...dataNew]);
        handleSelectItem();
    };

    const handlePlus = useCallback(async (id, item) => {
        const stok = item.product.stok;
        const dataFromState = dataCartState;
        const dataIndex = dataFromState.findIndex(cart => cart.id === id);
        if (stok > 0 && stok > dataFromState[dataIndex].qty) {
            dataFromState[dataIndex].qty = dataFromState[dataIndex].qty + 1;
            setDataCart([...dataFromState]);
            handleSelectItem();
        } else {
            ToastAndroid.showWithGravity('Stok Tidak mencukupi', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        // console.log(stok);
    }, [dataCartState, handleSelectItem]);

    const handleMinu = useCallback(async (id) => {
        const dataFromState = dataCartState;
        const dataIndex = dataFromState.findIndex(cart => cart.id === id);
        if (dataFromState[dataIndex].qty > 1) {
            dataFromState[dataIndex].qty = dataFromState[dataIndex].qty - 1;
        }
        setDataCart([...dataFromState]);
        handleSelectItem();
    }, [dataCartState, handleSelectItem]);

    const handleChechAll = useCallback(async () => {
        setToggleCheckBox(!toggleCheckBox);
        const dataFromState = dataCartState;
        const newData = [];
        dataFromState.forEach(element => {
            newData.push({ ...element, checkbox: !toggleCheckBox });
        });
        setDataCart([...newData]);
        if (!toggleCheckBox) {
            setFixDataCart([...newData]);
        } else {
            setFixDataCart([]);
        }
    }, [toggleCheckBox, dataCartState]);

    const handleSelectItem = useCallback(async () => {
        const Select = [];
        dataCartState.forEach(item => {
            if (item.checkbox === true) {
                Select.push(item);
            }
        });
        setFixDataCart(Select);
    }, [dataCartState]);

    const hetDataCart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser) {
            dispatch(getCArt(idUser));
        }
    }, [dispatch]);

    let row: Array<any> = [];
    let prevOpenedRow;
    const deleteProduk = useCallback(async (idProduk, index) => {
        const idUser = await getIdUser();
        const product_id = idProduk.product.id;
        const data = {
            user_id: idUser,
            list_product: [
                { product_id: product_id },
            ],
        };
        row[index].close();
        if (data.user_id !== null && product_id !== undefined) {
            dispatch(deleteProdukCart(data, hetDataCart));
        } else {
            console.log(data);
        }
    }, [dispatch, hetDataCart, row]);

    const closeRow = (index) => {
        // console.log();
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
    };

    const handleUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getDataUser(idUser));
        }
    }, [dispatch]);

    useEffect(() => {
        hetDataCart();
        handleUser();
        return () => {
            hetDataCart();
            handleUser();
            setDataCart([]);
        };
    }, [hetDataCart, handleUser]);

    useEffect(() => {
        const data = dataCart;
        const newData = [];
        data.forEach(element => {
            newData.push({ ...element, checkbox: true, qty: 1 });
        });
        setDataCart([...newData]);
        setFixDataCart([...newData]);
    }, [dataCart]);

    const handleBackButtonClick = useCallback(() => {
        navigation.goBack();
        return true;
    }, [navigation]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [handleBackButtonClick]);

    const rightSwipe = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() => deleteProduk(item, index)}
                activeOpacity={0.8}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FD3A69',
                    marginVertical: sizeHeight(1.3),
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    width: sizeWidth(20),
                }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                    color: color.fontWhite,
                }}>Delete</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.bgWhite} barStyle="dark-content" />
            <HeaderCart
                dataCart={dataCart}
                navigation={navigation}
                toggleCheckBox={toggleCheckBox}
                setToggleCheckBox={setToggleCheckBox}
            />
            {
                loading &&
                <View style={{
                    position: 'absolute',
                    width: SCREEN_WIDTH,
                    height: sizeHeight(90),
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    marginTop: sizeHeight(8),
                }}>
                    <ActivityIndicator color={color.mainColor} size="large" />
                </View>
            }
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: sizeWidth(5),
                marginTop: sizeHeight(1),
            }}>
                <Text style={{
                    fontSize: sizeFont(5),
                    fontFamily: Poppins.ExtraBold,
                    color: color.mainColor,
                }}>My Cart</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleChechAll()}
                    style={{
                        marginRight: sizeWidth(2),
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        fontSize: sizeFont(3),
                        color: color.fontBlack1,
                        marginRight: sizeWidth(3),
                    }}>Check All</Text>
                    {toggleCheckBox ?
                        <Ionicons name="checkbox" size={sizeFont(5)} color={color.mainColor} />
                        :
                        <Ionicons name="checkbox-outline" size={sizeFont(5)} color={color.mainColor} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.Content}>
                {dataCartState.length > 0 ?
                    <FlatList
                        contentContainerStyle={{
                            paddingHorizontal: sizeWidth(5),
                            paddingBottom: sizeHeight(13),
                        }}
                        data={dataCartState}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <Swipeable
                                ref={ref => row[index] = ref}
                                onSwipeableOpen={() => closeRow(index)}
                                renderRightActions={() => rightSwipe(item, index)}
                                renderLeftActions={false}
                            >
                                <View style={styles.BoxCard}>
                                    <ListProduk
                                        navigation={navigation}
                                        handleMinu={handleMinu}
                                        handlePlus={handlePlus}
                                        handleCechboxItem={handleCechboxItem}
                                        item={item} />
                                </View>
                            </Swipeable>
                        }
                    />
                    :
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: heightPercentageToDP(20),
                    }}>
                        <View style={{
                            width: sizeWidth(50),
                            height: sizeWidth(50),
                        }}>
                            <Image
                                source={require('../assets/images/cart/Cart_empty.png')}
                                style={{
                                    resizeMode: 'contain',
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </View>
                        <Text style={{
                            fontSize: sizeFont(4),
                            color: color.fontBlack2,
                            textAlign: 'center',
                            marginHorizontal: sizeWidth(7),
                        }}>wah keranjang belanjamu masih kosong, yuk telusuri promo menarik dari Mall 38</Text>
                    </View>
                }
            </View>
            <Deskripsi
                navigation={navigation}
                setLoading={setLoading}
                hetDataCart={hetDataCart}
                dataUser={dataUser}
                fixDataCart={fixDataCart} />
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
        // paddingHorizontal: sizeWidth(5),
        // paddingBottom: sizeHeight(10),
    },
    BoxCard: {
        marginVertical: sizeHeight(1.2),
        backgroundColor: color.bgWhite,
    },
});
