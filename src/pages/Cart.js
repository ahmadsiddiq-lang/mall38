/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Deskripsi from '../components/Cart/Deskripsi';
// import Kurir from '../components/Cart/Kurir';
// import MetodeBayar from '../components/Cart/MetodeBayar';
import ListProduk from '../components/Cart/ListProduk';
import HeaderCart from '../components/Header/HeaderCart';
import { getIdUser } from '../config/function';
import { getCArt } from '../redux/actions/Cart';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Cart({ navigation }) {

    const dispatch = useDispatch();
    const dataCart = useSelector(state => state.cart.dataCart);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
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

    const handlePlus = useCallback(async (id) => {
        const dataFromState = dataCartState;
        const dataIndex = dataFromState.findIndex(cart => cart.id === id);
        dataFromState[dataIndex].qty = dataFromState[dataIndex].qty + 1;
        // console.log(dataFromState);
        setDataCart([...dataFromState]);
        handleSelectItem();
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

    useEffect(() => {
        hetDataCart();
    }, [hetDataCart]);

    useEffect(() => {
        const data = dataCart;
        const newData = [];
        data.forEach(element => {
            newData.push({ ...element, checkbox: false, qty: 1 });
        });
        setDataCart([...newData]);
    }, [dataCart]);

    const rightSwipe = (progress, dragX) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'red',
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
                {dataCartState &&
                    <FlatList
                        data={dataCartState}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) =>
                            <Swipeable
                                renderRightActions={rightSwipe}
                                renderLeftActions={false}
                            >
                                <View style={styles.BoxCard}>
                                    <ListProduk
                                        handleMinu={handleMinu}
                                        handlePlus={handlePlus}
                                        handleCechboxItem={handleCechboxItem}
                                        item={item} />
                                </View>
                            </Swipeable>
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
            <Deskripsi
                navigation={navigation}
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
        paddingHorizontal: sizeWidth(5),
        paddingBottom: sizeHeight(28),
    },
    BoxCard: {
        marginVertical: sizeHeight(1.2),
        backgroundColor: color.bgWhite,
    },
});
