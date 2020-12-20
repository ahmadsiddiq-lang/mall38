/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getIdUser } from '../config/function';
import Login from './Login';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import { color } from '../assets/colors/Index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HeaderAkun from '../components/Header/HeaderAkun';
import { Poppins } from '../assets/fonts';
import Content from '../components/Akun/Content';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


export default function Akun({ navigation }) {

    const [ready, setReady] = useState(false);
    const dataUser = useSelector(state => state.dataLogin.dataUser);

    // console.log(dataUser);
    const handleUser = useCallback(async () => {
        const idUser = await AsyncStorage.getItem('idUser');
        if (idUser === undefined || idUser === null) {
            setReady(false);
        } else {
            setReady(false);
        }
    }, []);

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem('idUser');
            setReady(false);
            return true;
        }
        catch (exception) {
            return false;
        }
    };

    useEffect(() => {
        handleUser();
    });

    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor="#cfa2f5" barStyle="light-content" />
            <LinearGradient
                colors={['#cfa2f5', '#b477e6', color.mainColor]}
                style={styles.Back}
            >
                <HeaderAkun ready={ready} navigation={navigation} />
                <View style={styles.BoxUser}>
                    <FontAwesome5 name="user" color={color.fontWhite} size={sizeFont(13)} solid />
                </View>
            </LinearGradient>
            <ScrollView>
                <View style={styles.Content}>
                    <Content />
                </View>
                <View style={styles.Footer}>
                    {
                        ready ?
                            <TouchableOpacity
                                onPress={() => removeUser()}
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
        backgroundColor: '#cfa2f5',
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
});
