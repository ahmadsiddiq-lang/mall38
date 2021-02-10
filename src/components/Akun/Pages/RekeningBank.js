/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../../assets/colors/Index';
import { Poppins } from '../../../assets/fonts';
import { sizeFont, sizeWidth } from '../../../assets/responsive';
import { getIdUser, objekEmpty, ToasInvalid, ToasSuccess } from '../../../config/function';
import { getRekening, updateDataBank } from '../../../redux/actions/User';
import Headers from '../../Header/Headers';
import Clipboard from '@react-native-community/clipboard';

export default function RekeningBank({ navigation }) {

    const dispatch = useDispatch();

    const noRekening = useSelector(state => state.noRekening.noRekening);
    const [namaBank, setNamaBank] = useState(null);
    const [noRekeningInput, setNoRekening] = useState(null);
    const [lodaing, setLoading] = useState(true);
    const [modalVisible, setModal] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    // const noRekening = ['mausuk'];

    // console.log(noRekening);

    const handleGetRekening = useCallback(async () => {
        const idUser = await getIdUser();
        dispatch(getRekening(idUser, setLoading));
    }, [dispatch]);

    const handleSuccess = useCallback(() => {
        ToasSuccess('Success !');
        setButtonLoading(false);
        handleGetRekening();
        setModal(false);
    }, [handleGetRekening]);

    const handleInvalid = useCallback(() => {
        ToasInvalid('Gagal !');
        setButtonLoading(false);
        setModal(false);
    }, []);


    const handleUpdate = useCallback(async () => {
        if (namaBank !== null && noRekeningInput !== null) {
            const idUser = await getIdUser();
            const data = {
                user_id: idUser,
                nama_bank: namaBank,
                no_rek: noRekeningInput,
            };
            setButtonLoading(true);
            setModal(false);
            dispatch(updateDataBank(data, handleSuccess, handleInvalid));
        } else {
            ToasInvalid('Data invalid');
        }
    }, [dispatch, namaBank, noRekeningInput, handleSuccess, handleInvalid]);

    const SalinAccount = () => {
        if (objekEmpty(noRekening)) {
            Clipboard.setString(noRekening.nama_bank);
            ToasSuccess('Berhasil disalin');

        }
    };


    useEffect(() => {
        handleGetRekening();
        return () => {
            handleGetRekening();
        };
    }, [handleGetRekening]);

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Rekening Bank'}
            />
            {
                buttonLoading &&
                <View style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 999,
                }}>
                    <ActivityIndicator size="large" color={color.mainColor} />
                </View>
            }
            {
                lodaing ?
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator size="large" color={color.mainColor} />
                    </View>
                    :
                    <View style={[{
                        borderWidth: 0.2,
                        marginHorizontal: sizeWidth(5),
                        padding: sizeWidth(3),
                        borderRadius: 3,
                        backgroundColor: color.bgWhite,
                        shadowRadius: 10,
                        marginTop: heightPercentageToDP(10),
                        paddingVertical: heightPercentageToDP(5),
                        zIndex: -999,
                    },
                    !buttonLoading && { elevation: 5 },
                    ]}>
                        <Text style={{
                            fontSize: sizeFont(5),
                            textAlign: 'center',
                        }}>Nomor Rekening</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            marginTop: heightPercentageToDP(3),
                        }} >
                            {
                                objekEmpty(noRekening) ?
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={{
                                                fontSize: sizeFont(3.5),
                                            }}>Nama Bank : </Text>
                                            <Text style={{
                                                fontSize: sizeFont(4),
                                                fontFamily: Poppins.Medium,
                                                marginLeft: sizeWidth(2),
                                            }}>{objekEmpty(noRekening) && noRekening.nama_bank}</Text>

                                        </View>
                                        <Text style={{
                                            fontSize: sizeFont(4),
                                            fontFamily: Poppins.Medium,
                                        }}>{objekEmpty(noRekening) && noRekening.no_rek}</Text>
                                        <Text
                                            onPress={() => SalinAccount()}
                                            style={{
                                                fontSize: sizeFont(3.5),
                                                marginTop: heightPercentageToDP(3),
                                            }}>Salin</Text>
                                    </View>
                                    :
                                    <View style={{
                                        flex: 1,
                                        marginRight: 20,
                                    }}>
                                        <TextInput
                                            onChangeText={(e) => setNamaBank(e)}
                                            placeholder="Nama Bank"
                                            style={{
                                                backgroundColor: color.bgBlack4,
                                                elevation: 3,
                                                paddingLeft: sizeWidth(3),
                                                fontSize: sizeFont(3.5),
                                                borderWidth: 0.1,
                                                marginBottom: heightPercentageToDP(3),
                                            }}
                                        />
                                        <TextInput
                                            keyboardType="number-pad"
                                            onChangeText={(e) => setNoRekening(e)}
                                            placeholder="Nomor Rekening"
                                            style={{
                                                backgroundColor: color.bgBlack4,
                                                elevation: 3,
                                                paddingLeft: sizeWidth(3),
                                                fontSize: sizeFont(3.5),
                                                borderWidth: 0.1,
                                            }}
                                        />
                                    </View>
                            }
                            {
                                objekEmpty(noRekening) ?
                                    <TouchableOpacity
                                        onPress={() => setModal(true)}
                                        activeOpacity={0.8}
                                        style={{
                                            paddingVertical: heightPercentageToDP(1.2),
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
                                        }}>Edit</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => handleUpdate()}
                                        activeOpacity={0.8}
                                        style={{
                                            paddingVertical: heightPercentageToDP(1.2),
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
                                        }}>Create</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModal(!modalVisible);
                }}

            >
                <View style={{
                    borderWidth: 0.2,
                    marginHorizontal: sizeWidth(5),
                    paddingHorizontal: sizeWidth(5),
                    borderRadius: 3,
                    backgroundColor: color.bgWhite,
                    elevation: 5,
                    shadowRadius: 10,
                    marginTop: heightPercentageToDP(15),
                    paddingVertical: heightPercentageToDP(5),
                    height: heightPercentageToDP(45),
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            marginBottom: heightPercentageToDP(1),
                        }}>Nama Bank</Text>
                        <TextInput
                            value={objekEmpty(noRekening) ? noRekening.nama_bank : null}
                            onChangeText={(e) => setNamaBank(e)}
                            placeholder="Nama Bank"
                            style={{
                                backgroundColor: color.bgBlack4,
                                elevation: 3,
                                paddingLeft: sizeWidth(3),
                                fontSize: sizeFont(3.5),
                                borderWidth: 0.1,
                                marginBottom: heightPercentageToDP(3),
                            }}
                        />
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            marginBottom: heightPercentageToDP(1),
                        }}>Nomor Rekening</Text>
                        <TextInput
                            value={objekEmpty(noRekening) ? noRekening.no_rek : null}
                            onChangeText={(e) => setNoRekening(e)}
                            keyboardType="number-pad"
                            placeholder="Nomor Rekening"
                            style={{
                                backgroundColor: color.bgBlack4,
                                elevation: 3,
                                paddingLeft: sizeWidth(3),
                                fontSize: sizeFont(3.5),
                                borderWidth: 0.1,
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>
                        <TouchableOpacity
                            onPress={() => setModal(false)}
                            activeOpacity={0.8}
                            style={{
                                paddingVertical: heightPercentageToDP(1.2),
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
                            }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleUpdate()}
                            activeOpacity={0.8}
                            style={{
                                paddingVertical: heightPercentageToDP(1.2),
                                borderRadius: 8,
                                backgroundColor: color.mainColor,
                                elevation: 8,
                                flex: 0.3,
                                alignItems: 'center',
                                marginLeft: sizeWidth(5),
                            }}>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                                color: color.fontWhite,
                                fontFamily: Poppins.Medium,
                            }}>Update</Text>
                        </TouchableOpacity>
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
});
