/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { getIdUser, getToken, objekEmpty } from '../config/function';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { color } from '../assets/colors/Index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Poppins } from '../assets/fonts';
import Content from '../components/Akun/Content';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { getDataUser, clearDataUser, getWallet, getHostoryWallet } from '../redux/actions/User';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function Akun({ navigation }) {

    const dispatch = useDispatch();
    const dataUser = useSelector(state => state.dataUser.dataUser);
    const dataAll = dataUser.user;

    const [dataScreen, setDataUser] = useState(dataAll);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);


    // console.log(dataScreen);

    const handleUser = useCallback(async () => {
        const idUser = await getIdUser();
        // const token = await getToken();
        // console.log(token);
        if (idUser !== null) {
            dispatch(getDataUser(idUser));
            dispatch(getWallet(idUser));
            dispatch(getHostoryWallet(idUser));
        }
    }, [dispatch]);

    const handleClearDataUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(clearDataUser());
            await AsyncStorage.clear();
            setModalVisible(!modalVisible);
            setDataUser(undefined);
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

    const setStateAllDataUser = useCallback(async () => {
        if (dataScreen === undefined) {
            setDataUser(dataAll);
        }
    }, [dataScreen, dataAll]);


    useEffect(() => {
        handleUser();
        return () => {
            handleUser();
        };
    }, [handleUser]);

    useEffect(() => {
        setStateAllDataUser();
        return () => {
            setStateAllDataUser();
        };
    }, [setStateAllDataUser]);

    return (
        <View style={styles.Container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground
                resizeMethod="auto"
                source={require('../assets/images/background/Background.png')}
                style={{
                    width: SCREEN_WIDTH,
                    height: sizeHeight(40),
                }}
            >
                <View style={{
                    marginTop: sizeHeight(6.5),
                    paddingHorizontal: sizeWidth(5),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        borderWidth: 3,
                        borderColor: color.borderWhite,
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
                                <FontAwesome5 onPress={() => handleUser()} name="user" color={color.fontWhite} size={sizeFont(10)} solid />
                        }
                    </View>
                    <View style={{
                        marginLeft: sizeWidth(5),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(4.5),
                            color: color.fontWhite,
                            fontFamily: Poppins.Medium,
                        }}>{dataScreen !== undefined &&
                            objekEmpty(dataScreen) && dataScreen.name}</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontWhite,
                        }}>{dataScreen !== undefined &&
                            objekEmpty(dataScreen) && dataScreen.email}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.Content}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            style={{
                                zIndex: 999,
                                marginTop: sizeHeight(15),
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
                            marginTop: sizeHeight(3),
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
    },
    Back: {
        width: SCREEN_WIDTH,
        height: sizeHeight(20),
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
        marginTop: sizeHeight(7),
        height: heightPercentageToDP(70),
        zIndex: 1,
        backgroundColor: color.bgWhite,
        position: 'absolute',
        bottom: 0,
        width: SCREEN_WIDTH,
        borderTopLeftRadius: 50,
        paddingTop: sizeHeight(5),
    },
    Footer: {
        marginTop: sizeHeight(5),
        alignItems: 'center',
    },
    Bnt: {
        backgroundColor: color.mainColor,
        width: sizeWidth(90),
        paddingVertical: sizeHeight(0.5),
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
        marginTop: sizeHeight(2),
        borderRadius: 20,
        paddingVertical: sizeHeight(0.6),
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
