/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../assets/colors/Index';
import { useSelector } from 'react-redux';
import { getIdUser } from '../../config/function';
import { heightPercentageToDP } from 'react-native-responsive-screen';
export default function HeaderDetailProduk({ navigation, clearDetailProduks, headerOpacity, onShare }) {

    const [modalVisible, setModalVisible] = useState(false);
    const dataCart = useSelector(state => state.cart.dataCart);

    const handleTocart = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser === null) {
            // console.log(idUser);
            navigation.navigate('Login');
        } else {
            navigation.navigate('Cart');
            // clearDetailProduks();
        }
    }, [navigation]);

    const handleGoback = () => {
        navigation.goBack();
        clearDetailProduks();
    };

    return (
        <View style={styles.Container}>
            <Animated.View style={{
                backgroundColor: color.bgWhite,
                position: 'absolute',
                width: SCREEN_WIDTH,
                height: '100%',
                opacity: headerOpacity,
                borderBottomWidth: 0.5,
                borderColor: color.border2,
            }} />
            <View style={styles.Content}>
                <TouchableOpacity
                    onPress={() => handleGoback()}
                    activeOpacity={0.8}
                    style={styles.Btn}
                >
                    <Ionicons
                        name="arrow-back"
                        size={sizeFont(6.5)}
                        color={color.mainColor}
                    />
                </TouchableOpacity>
                <View style={styles.BoxBtnRight}>
                    <TouchableOpacity
                        onPress={() => onShare()}
                        activeOpacity={0.8}
                        style={styles.Btn}
                    >
                        <Ionicons
                            name="share-social"
                            size={sizeFont(6.5)}
                            color={color.mainColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleTocart()}
                        activeOpacity={0.8}
                        style={styles.Btn}
                    >
                        <Ionicons
                            name="cart"
                            size={sizeFont(6.5)}
                            color={color.mainColor}
                        />
                        <View style={styles.Circle}>
                            <Text style={{
                                color: color.fontWhite,
                                fontSize: sizeFont(3),
                            }}>{dataCart ? dataCart.length : '0'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        activeOpacity={0.8}
                        style={styles.Btn}
                    >
                        <Ionicons
                            name="ellipsis-vertical"
                            size={sizeFont(6.5)}
                            color={color.mainColor}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    right: sizeWidth(5),
                    marginTop: heightPercentageToDP(8),
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: sizeWidth(2),
                    borderRadius: 8,
                }}>
                    <Ionicons
                        name="alert-circle"
                        size={sizeFont(6.5)}
                        color={color.bgWhite}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            marginLeft: sizeWidth(2),
                            color: color.fontWhite,
                        }}>Laporkan Produk</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        zIndex: 1,
        height: sizeHeight(12),
    },
    Content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: sizeHeight(3.5),
        paddingHorizontal: sizeWidth(5),
        flex: 1,
    },
    Btn: {
        // padding: sizeHeight(2),
        backgroundColor: 'rgba(0, 0, 0,0.1)',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: sizeWidth(8),
        height: sizeWidth(8),
    },
    BoxBtnRight: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-between',
    },
    Circle: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: '#32a852',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        top: -8,
        right: -8,
    },
});
