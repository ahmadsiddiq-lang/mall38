/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { getIdUser, objekEmpty } from '../config/function';
import { SCREEN_WIDTH, sizeFont, sizeWidth } from '../assets/responsive';
import { color } from '../assets/colors/Index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Poppins } from '../assets/fonts';
import Content from '../components/Akun/Content';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { getDataUser, clearDataUser, getWallet, getHostoryWallet, clearDataWallet, clearHistoryWallet } from '../redux/actions/User';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { clearTransaksi } from '../redux/actions/Transaksi';
import { clearEdge } from '../redux/actions/edgeOrder';
import { clearDataMember } from '../redux/actions/Member';

export default function Akun({ navigation }) {

    const dispatch = useDispatch();
    const dataScreen = useSelector(state => state.dataUser.dataUser.user);
    const dataUser = useSelector(state => state.dataUser.dataUser);

    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [paket_mitra, setPacketMitra] = React.useState(null);


    // console.log(paket_mitra);

    const handleUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getDataUser(idUser));
            dispatch(getWallet(idUser));
            dispatch(getHostoryWallet(idUser));
        }
    }, [dispatch]);

    const handleClearDataUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(clearEdge());
            dispatch(clearDataUser());
            dispatch(clearDataWallet());
            dispatch(clearHistoryWallet());
            dispatch(clearTransaksi());
            dispatch(clearDataMember());
            await AsyncStorage.clear();
            setModalVisible(!modalVisible);
            navigation.replace('Login');
        }
    }, [dispatch, modalVisible, navigation]);

    const handleLogOut = useCallback(async () => {
        setModalVisible(!modalVisible);
    }, [modalVisible]);

    const wait = useCallback((timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            handleUser();
            setRefreshing(false);
        });
    }, [wait, handleUser]);

    const handleNavEditUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser) {
            if (dataUser.length > 0 || dataUser.user !== undefined) {
                navigation.navigate('EditUser', {
                    data: dataUser,
                });
            }
        }
    }, [navigation, dataUser]);

    const setDataPactketMita = useCallback(async () => {
        if (dataScreen.paket_mitra !== null) {
            if (dataScreen.paket_mitra !== undefined) {
                setPacketMitra(dataScreen.paket_mitra.nama_paket);
            }
        }
    }, [dataScreen]);

    useEffect(() => {
        setDataPactketMita();
        return () => {
            setPacketMitra(null);
        };
    }, [setDataPactketMita]);


    useEffect(() => {
        handleUser();
        return () => {
            handleUser();
        };
    }, [handleUser]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <ImageBackground
                resizeMethod="resize"
                source={require('../assets/images/background/Background.png')}
                style={{
                    width: SCREEN_WIDTH,
                    height: heightPercentageToDP(20),
                }}
            >
                <TouchableOpacity
                    onPress={() => handleNavEditUser()}
                    activeOpacity={0.9}
                    style={{
                        marginTop: heightPercentageToDP(5),
                        paddingHorizontal: sizeWidth(5),
                        flexDirection: 'row',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}>
                    <TouchableOpacity
                        onPress={() => handleNavEditUser()}
                        activeOpacity={1}
                        style={{
                            borderRadius: 100,
                            width: sizeWidth(20),
                            height: sizeWidth(20),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        {
                            dataScreen !== undefined &&
                                dataScreen.photo !== 'https://mall38.com/images/user/NULL' &&
                                dataScreen.photo !== null && dataScreen.photo !== undefined ?
                                < Image resizeMethod="auto" style={styles.ImageUser} source={{ uri: dataScreen.photo }} />
                                :
                                <Image
                                    style={styles.ImageUser}
                                    resizeMethod="auto"
                                    source={{ uri: `https://ui-avatars.com/api/?name=${dataScreen !== undefined ? dataUser.user.name : 'ahmad'}/background=0D8ABC&color=fff` }} />
                        }
                    </TouchableOpacity>
                    <View style={{
                        marginLeft: sizeWidth(5),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(4.8),
                            color: color.fontWhite,
                            fontFamily: Poppins.Medium,
                            textTransform: 'capitalize',
                        }}>{dataScreen !== undefined &&
                            objekEmpty(dataScreen) && dataScreen.name}</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontWhite,
                        }}>{dataScreen !== undefined &&
                            objekEmpty(dataScreen) && dataScreen.email}</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontWhite,
                        }}>{paket_mitra !== null && paket_mitra}</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.Content}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            style={{
                                zIndex: 999,
                                marginTop: heightPercentageToDP(15),
                            }}
                            colors={['#689F38', color.mainColor]}
                            refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Content
                        navigation={navigation}
                        handleNavEditUser={handleNavEditUser}
                    />
                    <View style={styles.Footer}>
                        <TouchableOpacity
                            onPress={() => handleLogOut()}
                            activeOpacity={0.8}
                            style={styles.Bnt}
                        >
                            <Text style={{
                                color: color.fontWhite,
                                fontSize: sizeFont(4),
                                fontFamily: Poppins.Medium,
                            }}>Keluar</Text>
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: sizeFont(3),
                            color: color.fontBlack1,
                            marginTop: heightPercentageToDP(3),
                        }}>Version 1.0</Text>
                    </View>
                </ScrollView>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.ContainerLogOut}>
                    <View style={styles.ContentLogOut}>
                        <Text style={{
                            fontSize: sizeFont(4),
                            fontFamily: Poppins.Medium,
                            textAlign: 'center',
                            color: color.fontBlack1,
                        }}>Yakin untuk keluar ?</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableHighlight
                                underlayColor="#b477e6"
                                style={{ ...styles.openButton, backgroundColor: color.mainColor }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Tidak</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#fc6565"
                                style={{ ...styles.openButton, backgroundColor: '#FD3A69' }}
                                onPress={() => {
                                    handleClearDataUser();
                                }}
                            >
                                <Text style={styles.textStyle}>Ya</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.mainColor,
    },
    Back: {
        width: SCREEN_WIDTH,
        height: heightPercentageToDP(20),
        backgroundColor: color.mainColor,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    BoxUser: {
        borderWidth: 4,
        borderColor: color.borderWhite,
        position: 'absolute',
        width: sizeWidth(25),
        height: sizeWidth(25),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        right: sizeWidth(15),
        bottom: -40,
        backgroundColor: color.mainColor,
        overflow: 'hidden',
        padding: sizeWidth(1),
        zIndex: 1,
    },
    ImageUser: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    Content: {
        // borderWidth: 1,
        height: heightPercentageToDP(73),
        zIndex: 1,
        backgroundColor: color.bgWhite,
        flex: 1,
        // position: 'absolute',
        // bottom: 0,
        width: SCREEN_WIDTH,
        borderTopLeftRadius: 50,
        paddingTop: heightPercentageToDP(5),
    },
    Footer: {
        marginTop: heightPercentageToDP(5),
        alignItems: 'center',
    },
    Bnt: {
        backgroundColor: color.mainColor,
        width: sizeWidth(90),
        paddingVertical: heightPercentageToDP(1),
        alignItems: 'center',
        borderRadius: 8,
    },
    ContainerLogOut: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    ContentLogOut: {
        backgroundColor: color.bgBlack3,
        borderWidth: 1,
        borderColor: color.border2,
        padding: sizeWidth(3),
        borderRadius: 8,
    },
    openButton: {
        marginTop: heightPercentageToDP(2),
        borderRadius: 20,
        paddingVertical: heightPercentageToDP(0.6),
        elevation: 2,
        alignItems: 'center',
        marginHorizontal: sizeWidth(2),
        width: sizeWidth(30),
    },
    textStyle: {
        fontSize: sizeFont(4),
        fontFamily: Poppins.Medium,
        color: color.fontWhite,
    },
});
