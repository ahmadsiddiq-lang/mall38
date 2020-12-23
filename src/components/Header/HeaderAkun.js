import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { Poppins } from '../../assets/fonts';
import { getIdUser, objekEmpty } from '../../config/function';

export default function HeaderAkun({ navigation, dataUser = [], dataScreen }) {

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

    return (
        <View style={styles.Container}>
            {
                dataScreen !== undefined &&
                    objekEmpty(dataScreen) ?
                    <View>
                        <Text style={{
                            fontSize: sizeFont(5.5),
                            fontFamily: Poppins.Bold,
                            color: color.fontWhite,
                            marginLeft: sizeWidth(5),
                        }}>{dataScreen.name}</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontWhite,
                            marginLeft: sizeWidth(5),
                        }}>{dataScreen.email}</Text>
                    </View>
                    :
                    <View>
                        <Text style={{
                            fontSize: sizeFont(5.5),
                            fontFamily: Poppins.Bold,
                            color: color.fontWhite,
                            marginLeft: sizeWidth(5),
                        }}>Login</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontWhite,
                            marginLeft: sizeWidth(5),
                        }}>Anda belum login</Text>
                    </View>
            }
            <TouchableOpacity
                onPress={() => handleNavEditUser()}
                activeOpacity={0.8}
                style={styles.BtnBack}
            >
                <FontAwesome5
                    name="edit"
                    size={sizeFont(4.5)}
                    color={color.fontWhite}
                    light
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: sizeWidth(5),
        marginTop: sizeHeight(3),
    },
    BtnBack: {
        width: sizeWidth(8),
        height: sizeWidth(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
