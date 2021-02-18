/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../../assets/colors/Index';
import { Poppins } from '../../../assets/fonts';
import { sizeFont, sizeWidth } from '../../../assets/responsive';
import { getIdUser, objekEmpty, openWhatsApp, ToasSuccess } from '../../../config/function';
import { getRekening } from '../../../redux/actions/User';
import Headers from '../../Header/Headers';
import Clipboard from '@react-native-community/clipboard';

export default function RekeningBank({ navigation }) {

    const dispatch = useDispatch();

    const noRekening = useSelector(state => state.noRekening.noRekening);
    const dataUser = useSelector(state => state.dataUser.dataUser);

    const [lodaing, setLoading] = useState(false);

    const name_user = objekEmpty(dataUser) ? dataUser.user.name : '';
    // const noRekening = [];

    console.log(dataUser);

    const handleGetRekening = useCallback(async () => {
        const idUser = await getIdUser();
        dispatch(getRekening(idUser, setLoading));
    }, [dispatch]);


    const SalinAccount = () => {
        if (objekEmpty(noRekening)) {
            Clipboard.setString(noRekening.no_rek);
            ToasSuccess('Berhasil disalin');

        }
    };


    useEffect(() => {
        handleGetRekening();
    }, [handleGetRekening]);

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Rekening Bank'}
            />
            {
                lodaing ?
                    <>
                        {
                            objekEmpty(noRekening) ?
                                <View style={{
                                    flex: 1,
                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                        marginTop: hp(5),
                                    }}>
                                        <View style={{
                                            width: sizeWidth(85),
                                            height: sizeWidth(50),
                                            paddingHorizontal: sizeWidth(8),
                                            justifyContent: 'space-between',
                                            paddingVertical: sizeWidth(6),
                                        }}>
                                            <View style={{
                                                width: sizeWidth(85),
                                                height: sizeWidth(50),
                                                position: 'absolute',
                                                left: 0,
                                            }}>
                                                <Image
                                                    source={require('../../../assets/images/Rekening/BG-Kartu.png')}
                                                    style={{
                                                        resizeMode: 'stretch',
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                />
                                            </View>
                                            <Text style={styles.TextContent}>{objekEmpty(noRekening) && noRekening.nama_bank}</Text>
                                            <Text onPress={() => SalinAccount()} style={styles.TextContent}>{objekEmpty(noRekening) && noRekening.no_rek}</Text>
                                            <Text style={[styles.TextContent, { fontFamily: Poppins.Regular, fontSize: sizeFont(4.5) }]}>{name_user}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            width: sizeWidth(80),
                                            paddingLeft: sizeWidth(5),
                                            marginTop: hp(5),
                                        }}>
                                            <Image
                                                source={require('../../../assets/images/Rekening/IconInfo.png')}
                                                style={{
                                                    resizeMode: 'contain',
                                                    width: sizeWidth(4.5),
                                                    height: sizeWidth(4.5),
                                                    marginTop: 3,
                                                }}
                                            />
                                            <Text
                                                onPress={() => openWhatsApp('Salam')}
                                                style={{
                                                    marginLeft: sizeWidth(3),
                                                    fontSize: sizeFont(3.5),
                                                    color: color.mainColor1,
                                                }}>Silahkan hubungi customer service untuk mengganti nomor rekening</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{
                                    flex: 1,
                                }}>
                                    <View style={{
                                        flex: 13,
                                    }}>
                                        <View style={{
                                            alignItems: 'center',
                                            marginTop: hp(7),
                                        }}>
                                            <View style={{
                                                width: sizeWidth(75),
                                                height: sizeWidth(75),
                                            }}>
                                                <Image
                                                    source={require('../../../assets/images/Rekening/IconKosong.png')}
                                                    style={{
                                                        resizeMode: 'contain',
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                />
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                width: sizeWidth(80),
                                                paddingLeft: sizeWidth(5),
                                            }}>
                                                <Image
                                                    source={require('../../../assets/images/Rekening/IconInfo.png')}
                                                    style={{
                                                        resizeMode: 'contain',
                                                        width: sizeWidth(4.5),
                                                        height: sizeWidth(4.5),
                                                        marginTop: 3,
                                                    }}
                                                />
                                                <Text style={{
                                                    marginLeft: sizeWidth(3),
                                                    fontSize: sizeFont(3.5),
                                                    color: color.mainColor1,
                                                }}>Rekening bak masih kosong. Silahkan masukkan data rekening bank</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{
                                        flex: 2,
                                        justifyContent: 'center',
                                        paddingHorizontal: sizeWidth(5),
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('InputRekening')}
                                            activeOpacity={0.8}
                                            style={{
                                                paddingVertical: hp(1.6),
                                                borderRadius: 8,
                                                backgroundColor: color.mainColor,
                                                elevation: 8,
                                                flex: 0.3,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={{
                                                fontSize: sizeFont(3.5),
                                                color: color.fontWhite,
                                                fontFamily: Poppins.Medium,
                                            }}>Masukkan Rekening</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    </>
                    :
                    <View style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: hp(8),
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 999,
                    }}>
                        <ActivityIndicator style={{
                            backgroundColor: color.mainColor,
                            borderRadius: 100,
                            padding: 5,
                        }} size="large" color={color.fontWhite} />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    TextContent: {
        fontSize: sizeFont(5.5),
        color: color.fontWhite,
        fontFamily: Poppins.Medium,
    },
});
