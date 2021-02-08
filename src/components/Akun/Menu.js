/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Menu({ handleNavEditUser, navigation }) {

    return (
        <View style={styles.Container}>
            <View style={{
                marginHorizontal: sizeWidth(5),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                }}>Akun</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SaldoBonus')}
                    activeOpacity={0.8}
                    style={styles.BtnList}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                            source={require('../../assets/images/pageAkun/Saldo-Bonus.png')} />
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            marginLeft: sizeWidth(3),
                        }}>Saldo Bonus</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={sizeFont(3.5)} color={color.fontBlack1} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RekeningBank')}
                    activeOpacity={0.8}
                    style={styles.BtnList}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                            source={require('../../assets/images/pageAkun/Rekening-Bank.png')} />
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            marginLeft: sizeWidth(3),
                        }}>Rekening Bank</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={sizeFont(3.5)} color={color.fontBlack1} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleNavEditUser()}
                    activeOpacity={0.8}
                    style={styles.BtnList}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                            source={require('../../assets/images/pageAkun/Profile.png')} />
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            marginLeft: sizeWidth(3),
                        }}>Profile</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={sizeFont(3.5)} color={color.fontBlack1} />
                </TouchableOpacity>
            </View>
            <View style={{
                marginHorizontal: sizeWidth(5),
                marginTop: sizeHeight(2),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                }}>Keamanan</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('UbahPin')}
                    activeOpacity={0.8}
                    style={styles.BtnList}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                            source={require('../../assets/images/pageAkun/Ubah-Pin.png')} />
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            marginLeft: sizeWidth(3),
                        }}>Ubah Pin</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={sizeFont(3.5)} color={color.fontBlack1} />
                </TouchableOpacity>
            </View>
            <View style={{
                marginHorizontal: sizeWidth(5),
                marginTop: sizeHeight(2),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                }}>Tentang</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Panduan')}
                    activeOpacity={0.8}
                    style={styles.BtnList}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                            source={require('../../assets/images/pageAkun/Panduan.png')} />
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            marginLeft: sizeWidth(3),
                        }}>Panduan</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={sizeFont(3.5)} color={color.fontBlack1} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Syarat')}
                    activeOpacity={0.8}
                    style={styles.BtnList}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                            source={require('../../assets/images/pageAkun/Syarat.png')} />
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            marginLeft: sizeWidth(3),
                        }}>Syarat dan Ketentuan</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={sizeFont(3.5)} color={color.fontBlack1} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Tentang', {
                        title: 'Kebijakan Privasi',
                        body: 'Kebijakan Privasi',
                    })}
                    activeOpacity={0.8}
                    style={styles.BtnList}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: sizeWidth(5),
                                height: sizeWidth(5),
                            }}
                            source={require('../../assets/images/pageAkun/Kebijakan.png')} />
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            marginLeft: sizeWidth(3),
                        }}>Kebijakan Privasi</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={sizeFont(3.5)} color={color.fontBlack1} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    BtnList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: sizeHeight(1),
        paddingVertical: sizeWidth(3),
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
    },
});
