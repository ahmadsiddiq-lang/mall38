/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import Headers from '../components/Header/Headers';

export default function Pembayaran({ navigation, route }) {

    // console.log(route.params);

    return (
        <View style={styles.Container}>
            <Headers navigation={navigation} title={'Pembayaran'} />
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
                }}>Rp. 200.000</Text>
            </View>
            <View style={{
                backgroundColor: color.bgWhite,
                paddingHorizontal: sizeWidth(5),
                paddingVertical: sizeHeight(1),
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
                        fontSize: sizeFont(3.5),
                    }}>Bank BNI</Text>
                    <Text
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
                    <Text style={{
                        fontSize: sizeFont(3.5),
                    }}>Virtual Account</Text>
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.mainColor,
                        fontFamily: Poppins.Medium,
                    }}>08238964982364</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,

    },
});
