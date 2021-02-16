/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react';
import { BackHandler, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Clipboard from '@react-native-community/clipboard';
import { rupiah, ToasSuccess } from '../config/function';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AccordionView from '../components/PageBayar/AccorDion';


const Header = ({ handleBackButtonClick }) => {
    return (
        <View style={styles.Header}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleBackButtonClick()}
                style={{
                    paddingVertical: sizeWidth(3.5),
                    paddingLeft: sizeWidth(5),
                }}
            >
                <Ionicons
                    name="arrow-back"
                    size={sizeFont(6.5)}
                    color={color.fontWhite}
                />
            </TouchableOpacity>
            <Text style={{
                marginLeft: sizeWidth(5),
                fontSize: sizeFont(4.5),
                color: color.fontWhite,
                fontFamily: Poppins.Medium,
            }}>Pembayaran</Text>
        </View>
    );
};


export default function PageBayar({ navigation, route }) {


    const dataPembayaran = route.params.data;
    const dataPetunjuk = route.params.dataPetunjuk;
    console.log(dataPembayaran);

    const SalinAccount = () => {
        Clipboard.setString(dataPembayaran.kode_pembayaran.toString());
        ToasSuccess('Berhasil disalin');
    };

    const filterData = () => {
        return dataPembayaran.bank_name === 'cstore';
    };

    const handleBackButtonClick = useCallback(() => {
        navigation.goBack();
        return true;
    }, [navigation]);

    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    //     };
    // }, [handleBackButtonClick]);

    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor={color.mainColor} />
            <Header
                handleBackButtonClick={handleBackButtonClick}
                navigation={navigation} />
            <ScrollView>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: color.bgWhite,
                        paddingHorizontal: sizeWidth(5),
                        paddingVertical: sizeHeight(1.5),
                        marginBottom: sizeHeight(1),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                        }}>Total Pembayaran</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                            color: color.mainColor,
                        }}>Rp. {dataPembayaran.total_pembayaran !== undefined && rupiah(dataPembayaran.total_pembayaran)}</Text>
                    </View>
                    <View style={{
                        backgroundColor: color.bgWhite,
                        paddingHorizontal: sizeWidth(5),
                        paddingVertical: sizeHeight(1),
                        marginBottom: sizeHeight(1),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: sizeHeight(1),
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                            }}>Metode Pembayaran</Text>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                            }}>Bank Transfer</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: sizeHeight(2),
                        }}>
                            <Text style={{
                                textTransform: 'uppercase',
                                fontSize: sizeFont(3.5),
                            }} >{dataPembayaran.bank_name}</Text>
                            <Text
                                onPress={() => SalinAccount()}
                                style={{
                                    fontSize: sizeFont(3.5),
                                    color: color.mainColor,
                                }}
                            >Salin</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: sizeHeight(1),
                        }}>
                            {
                                filterData() ?
                                    <Text style={{
                                        fontSize: sizeFont(3.5),
                                    }}>Payment Code</Text>
                                    :
                                    <Text style={{
                                        fontSize: sizeFont(3.5),
                                    }}>Virtual Account</Text>
                            }
                            <Text style={{
                                fontSize: sizeFont(4),
                                color: color.mainColor,
                                fontFamily: Poppins.Medium,
                            }}>{dataPembayaran.kode_pembayaran}</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: sizeWidth(5),
                        paddingVertical: sizeHeight(1.5),
                        backgroundColor: color.bgWhite,
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.3),
                        }}>Mohon lakukan pembayaran sebelum tanggal :</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            fontFamily: Poppins.Medium,
                            color: color.mainColor,
                        }}>
                            {dataPembayaran.expired_time} WIB
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: color.bgWhite,
                        flex: 1,
                        marginTop: hp(1),
                    }}>
                        {/* <View style={{
                            width: sizeWidth(55),
                            height: sizeWidth(55),
                            marginRight: sizeWidth(10),
                        }}>
                            <Image
                                source={require('../assets/images/loading/Payment.gif')}
                                style={{
                                    resizeMode: 'contain',
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </View>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            textAlign: 'center',
                            marginHorizontal: sizeWidth(5),
                            color: color.fontBlack1,
                        }}>Silahkan melakukan pembayaran sesuai dengan metode yang Anda pilih</Text> */}
                        <AccordionView
                            dataPetunjuk={dataPetunjuk}
                            dataPembayaran={dataPembayaran}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{
                width: SCREEN_WIDTH,
                paddingHorizontal: sizeWidth(5),
                paddingVertical: sizeHeight(2),
                backgroundColor: color.bgWhite,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MyTabbar')}
                    activeOpacity={0.8}
                    style={{
                        paddingVertical: sizeHeight(1),
                        backgroundColor: color.mainColor,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.fontWhite,
                        fontFamily: Poppins.Bold,
                    }}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    Header: {
        backgroundColor: color.mainColor,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
