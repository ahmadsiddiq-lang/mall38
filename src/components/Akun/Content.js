/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getIdUser } from '../../config/function';
import { getTransaksi } from '../../redux/actions/Transaksi';
import { useDispatch, useSelector } from 'react-redux';

export default function Content({ navigation }) {
    const dispatch = useDispatch();
    const dataTransaksi = useSelector(state => state.dataTransaksi.dataTransaksi.order);
    const handleGetTransaksi = useCallback(async () => {
        const idUser = await getIdUser();
        if (idUser !== null) {
            dispatch(getTransaksi(idUser));
        }
    }, [dispatch]);


    useEffect(() => {
        handleGetTransaksi();
    }, [handleGetTransaksi]);

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('TransaksiInfo')}
                activeOpacity={0.8}
                style={styles.BtnList}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View>
                        {
                            dataTransaksi !== undefined && dataTransaksi.length > 0 &&
                            <View style={styles.Circle} />
                        }
                        <Ionicons
                            name="cube-outline"
                            color={color.mainColor}
                            size={sizeFont(6.5)}
                        />
                    </View>
                    <Text style={{
                        fontSize: sizeFont(3.6),
                        marginLeft: sizeWidth(3),
                    }}>Pesanan Saya</Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    color={color.mainColor}
                    size={sizeFont(4.5)}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.BtnList}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Ionicons
                        name="cog-outline"
                        color={color.mainColor}
                        size={sizeFont(6.5)}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.6),
                        marginLeft: sizeWidth(3),
                    }}>Pengaturan Akun</Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    color={color.mainColor}
                    size={sizeFont(4.5)}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.BtnList}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Ionicons
                        name="shield-checkmark-outline"
                        color={color.mainColor}
                        size={sizeFont(6.5)}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.6),
                        marginLeft: sizeWidth(3),
                    }}>Sayarat dan Ketentuan</Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    color={color.mainColor}
                    size={sizeFont(4.5)}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.BtnList}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Ionicons
                        name="help-circle-outline"
                        color={color.mainColor}
                        size={sizeFont(6.5)}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.6),
                        marginLeft: sizeWidth(3),
                    }}>Pusat Bantuan</Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    color={color.mainColor}
                    size={sizeFont(4.5)}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.BtnList}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Ionicons
                        name="alert-circle-outline"
                        color={color.mainColor}
                        size={sizeFont(6.5)}
                    />
                    <Text style={{
                        fontSize: sizeFont(3.6),
                        marginLeft: sizeWidth(3),
                    }}>Tentang</Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    color={color.mainColor}
                    size={sizeFont(4.5)}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    BtnList: {
        borderBottomWidth: 1,
        borderBottomColor: color.border2,
        paddingVertical: sizeHeight(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Circle: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: '#2a05ff',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        top: 2,
        right: -2,
    },
});
