import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { Poppins } from '../../assets/fonts';

export default function HeaderAkun({ navigation, ready }) {
    return (
        <View style={styles.Container}>
            {/* <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
                style={styles.BtnBack}
            >
                <Ionicons
                    name="arrow-back"
                    size={sizeFont(6.5)}
                    color={color.fontWhite}
                />
            </TouchableOpacity> */}
            {
                ready ?
                    <View>
                        <Text style={{
                            fontSize: sizeFont(5.5),
                            fontFamily: Poppins.Bold,
                            color: color.fontWhite,
                            marginLeft: sizeWidth(5),
                        }}>Ahmad Siddiq</Text>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontWhite,
                            marginLeft: sizeWidth(5),
                        }}>ahmads@gmail.com</Text>
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
                // onPress={() => navigation.goBack()}
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
