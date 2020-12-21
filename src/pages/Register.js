/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import HeaderRegister from '../components/Header/HeaderRegister';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Poppins } from '../assets/fonts';

export default function Register({ navigation }) {
    const [focus, setFocus] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);

    return (
        <View style={styles.Container}>
            <HeaderRegister navigation={navigation} title="Register" />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    alignItems: 'center',
                }}>
                    <View style={styles.BoxImage}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMethod="auto"
                            source={require('../assets/images/logo/logo.png')} />
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    flex: 1,
                }}>
                    <View style={styles.BoxContentInput}>
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <View style={styles.BoxIconUser}>
                                <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(12)} solid />
                            </View>
                        </View>
                        <View style={[styles.BoxInput,
                        focus === 2 &&
                        {
                            borderWidth: 3,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="user" color={color.mainColor} size={sizeFont(5)} solid />
                            <TextInput
                                onChangeText={(e) => setUsername(e)}
                                onBlur={() => setFocus(null)}
                                onFocus={() => setFocus(2)}
                                style={styles.Input}
                                placeholder="Username"
                            />
                        </View>
                        <View style={[styles.BoxInput,
                        focus === 0 &&
                        {
                            borderWidth: 3,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="at" color={color.mainColor} size={sizeFont(5)} solid />
                            <TextInput
                                onChangeText={(e) => setEmail(e)}
                                onFocus={() => setFocus(0)}
                                onBlur={() => setFocus(null)}
                                placeholder="Email"
                                style={styles.Input}
                                keyboardType="email-address"
                            />
                        </View>
                        <View style={[styles.BoxInput,
                        focus === 1 &&
                        {
                            borderWidth: 3,
                            borderColor: color.mainColor,
                        },
                        ]}>
                            <FontAwesome5 name="key" color={color.mainColor} size={sizeFont(5)} solid />
                            <TextInput
                                onChangeText={(e) => setPassword(e)}
                                secureTextEntry={true}
                                onBlur={() => setFocus(null)}
                                onFocus={() => setFocus(1)}
                                style={styles.Input}
                                placeholder="Password"
                            />
                        </View>
                    </View>
                    <View style={styles.BoxContentLogin}>
                        <TouchableOpacity
                            // onPress={() => handleLogin()}
                            activeOpacity={0.8}
                            style={styles.BtnLogin}
                        >
                            <Text style={{
                                fontSize: sizeFont(4.5),
                                color: color.fontWhite,
                                fontFamily: Poppins.Bold,
                                flex: 1,
                                textAlign: 'center',
                            }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
        alignItems: 'center',
    },
    BoxImage: {
        width: sizeWidth(60),
        height: sizeWidth(30),
        alignItems: 'center',
    },
    BoxContentInput: {
        borderWidth: 3,
        borderColor: color.mainColor,
        borderRadius: 8,
        width: sizeWidth(80),
        padding: sizeHeight(3),
        // marginTop: sizeHeight(1),
    },
    BoxInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: sizeHeight(1),
        borderColor: color.border2,
        borderRadius: 8,
        marginVertical: sizeHeight(2),
    },
    Input: {
        // borderWidth: 1,
        marginLeft: sizeWidth(2),
        flex: 1,
        fontSize: sizeFont(4),
    },
    BoxContentLogin: {
        marginTop: sizeHeight(5),
        alignItems: 'flex-end',
    },
    BtnLogin: {
        backgroundColor: color.mainColor,
        width: sizeWidth(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: sizeHeight(0.5),
        borderRadius: 8,
        alignItems: 'center',
    },
});
