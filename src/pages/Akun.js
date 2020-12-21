/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { getIdUser, objekEmpty } from '../config/function';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { color } from '../assets/colors/Index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HeaderAkun from '../components/Header/HeaderAkun';
import { Poppins } from '../assets/fonts';
import Content from '../components/Akun/Content';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { getDataUser, clearDataUser } from '../redux/actions/User';


export default function Akun({ navigation }) {

    const dispatch = useDispatch();
    const dataUser = useSelector(state => state.dataUser.dataUser);
    const [modalVisible, setModalVisible] = useState(false);


    const handleUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getDataUser(idUser));
        }
    }, [dispatch]);

    const handleClearDataUser = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(clearDataUser());
            await AsyncStorage.removeItem('idUser');
            setModalVisible(!modalVisible);
        }
    }, [dispatch, modalVisible]);

    const handleLogOut = useCallback(async () => {
        setModalVisible(!modalVisible);
    }, [modalVisible]);


    useEffect(() => {
        handleUser();
    }, [handleUser]);

    return (
        <View style={styles.Container}>
            <LinearGradient
                colors={[color.mainColor, '#b477e6', '#cfa2f5']}
                style={styles.Back}
            >
                <HeaderAkun dataUser={dataUser} navigation={navigation} />
                <View style={styles.BoxUser}>
                    {
                        dataUser.image ?
                            <Image resizeMethod="auto" style={styles.ImageUser} source={{ uri: dataUser.photo }} />
                            :
                            <FontAwesome5 onPress={() => handleUser()} name="user" color={color.fontWhite} size={sizeFont(13)} solid />
                    }
                </View>
            </LinearGradient>
            <ScrollView>
                <View style={styles.Content}>
                    <Content />
                </View>
                <View style={styles.Footer}>
                    {
                        objekEmpty(dataUser) ?
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
                            :
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                activeOpacity={0.8}
                                style={styles.Bnt}
                            >
                                <Text style={{
                                    color: color.fontWhite,
                                    fontSize: sizeFont(4),
                                    fontFamily: Poppins.Medium,
                                }}>Login</Text>
                            </TouchableOpacity>
                    }
                    <Text style={{
                        fontSize: sizeFont(3),
                        color: color.fontBlack1,
                        marginTop: sizeHeight(3),
                    }}>Version 1.0</Text>
                </View>
            </ScrollView>
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
                                style={{ ...styles.openButton, backgroundColor: 'red' }}
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
        backgroundColor: color.bgWhite,
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
    },
    ImageUser: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    Content: {
        // borderWidth: 1,
        marginTop: sizeHeight(7),
        paddingHorizontal: sizeWidth(10),
    },
    Footer: {
        marginTop: sizeHeight(5),
        alignItems: 'center',
    },
    Bnt: {
        backgroundColor: color.mainColor,
        width: sizeWidth(70),
        paddingVertical: sizeHeight(0.8),
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
