/* eslint-disable react-native/no-inline-styles */
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { color } from '../../../assets/colors/Index';
import { Poppins } from '../../../assets/fonts';
import { sizeFont, sizeWidth } from '../../../assets/responsive';
import { dataBank } from '../../../config/DataDummy';
import { getIdUser, ToasInvalid, ToasSuccess } from '../../../config/function';
import { getRekening, updateDataBank } from '../../../redux/actions/User';
import Headers from '../../Header/Headers';

export default function InputRekening({ navigation }) {

    const [namaBank, setNamaBank] = useState(dataBank[0]);
    const [noRekeningInput, setNoRekening] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleGetRekening = useCallback(async () => {
        const idUser = await getIdUser();
        dispatch(getRekening(idUser, setLoading));
    }, [dispatch]);


    const handleSuccess = useCallback(() => {
        setLoading(false);
        ToasSuccess('Success !');
        handleGetRekening();
        const x = setTimeout(() => {
            navigation.goBack();
            return () => {
                clearTimeout(x);
            };
        }, 700);
    }, [navigation, handleGetRekening]);

    const handleInvalid = useCallback(() => {
        setLoading(false);
        ToasInvalid('Gagal !');
    }, []);


    const handleUpdate = useCallback(async () => {
        if (namaBank !== null && noRekeningInput !== null) {
            setLoading(true);
            const idUser = await getIdUser();
            const data = {
                user_id: idUser,
                nama_bank: namaBank,
                no_rek: noRekeningInput,
            };
            Keyboard.dismiss();
            dispatch(updateDataBank(data, handleSuccess, handleInvalid));
        } else {
            ToasInvalid('Masukkan data dengan benar');
        }
    }, [dispatch, namaBank, noRekeningInput, handleSuccess, handleInvalid]);

    return (
        <View style={styles.container}>
            <Headers
                navigation={navigation}
                title={'Input Rekening Bank'}
            />
            <Text style={styles.title}>Masukkan rekening bank sesuai dengan KTP</Text>
            <View style={styles.content}>
                <View style={styles.BoxList}>
                    <Text style={styles.titleInput}>Nama Bank</Text>
                    <View style={styles.Input}>
                        <Picker
                            mode="dialog"
                            selectedValue={namaBank}
                            onValueChange={(itemValue, itemIndex) =>
                                setNamaBank(itemValue)
                            }
                        >
                            {
                                dataBank.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={item} value={item} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                </View>
                <View style={styles.BoxList}>
                    <Text style={styles.titleInput}>Rekening Bank</Text>
                    <TextInput
                        onChangeText={(e) => setNoRekening(e)}
                        style={[styles.Input, { paddingLeft: sizeWidth(2) }]}
                        maxLength={16}
                        keyboardType="number-pad"
                        selectionColor={color.mainColor}
                    />
                </View>
                <View style={{
                    marginTop: hp(3),
                }}>
                    <Text style={styles.text}>* Pastikan nomor rekening yang Anda masukkan sesuai dengan buku tabungan atas nama Anda</Text>
                    <Text style={styles.text}>* Penggunaan rekening atas nama orang lain tidak dapat kami verifikasi</Text>
                </View>
            </View>
            <View style={{
                flex: 2,
                justifyContent: 'center',
                paddingHorizontal: sizeWidth(5),
            }}>
                <TouchableOpacity
                    onPress={() => handleUpdate()}
                    activeOpacity={0.8}
                    style={{
                        borderRadius: 8,
                        backgroundColor: color.mainColor,
                        elevation: 8,
                        alignItems: 'center',
                        height: hp(5.5),
                        justifyContent: 'center',
                    }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        color: color.fontWhite,
                        fontFamily: Poppins.Medium,
                    }}>Simpan</Text>
                </TouchableOpacity>
            </View>
            {
                loading &&
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
    container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    title: {
        fontSize: sizeFont(3.5),
        fontFamily: Poppins.Medium,
        textAlign: 'center',
        marginTop: hp(4),
    },
    content: {
        marginTop: hp(5),
        paddingHorizontal: sizeWidth(5),
        flex: 13,
    },
    BoxList: {
        marginBottom: hp(3),
    },
    titleInput: {
        fontSize: sizeFont(3.3),
        color: color.fontBlack1,
    },
    Input: {
        borderBottomWidth: 1,
        borderColor: color.border2,
        fontSize: sizeFont(4),
        fontFamily: Poppins.Medium,
    },
    text: {
        fontSize: sizeFont(3.3),
        color: color.mainColor,
        marginBottom: hp(1),
    },
});
