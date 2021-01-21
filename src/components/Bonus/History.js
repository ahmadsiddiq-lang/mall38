/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function History() {

    return (
        <View style={styles.Container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: sizeWidth(5),
                marginVertical: sizeHeight(2),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                }}>History Bonus</Text>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                    color: color.mainColor,
                }}>Total BV: 30.900</Text>
            </View>
            <ScrollView>
                <View style={{
                    marginHorizontal: sizeWidth(5),
                }}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end',
                                        borderBottomWidth: 1,
                                        borderBottomColor: color.border2,
                                        paddingBottom: sizeHeight(1.5),
                                        marginBottom: sizeHeight(1.5),
                                    }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Image
                                            source={require('../../assets/images/pageAkun/Wallet.png')}
                                            style={{
                                                resizeMode: 'contain',
                                                width: sizeWidth(5),
                                                height: sizeWidth(5),
                                            }}
                                        />
                                        <View style={{
                                            marginLeft: sizeWidth(3),
                                        }}>
                                            <Text style={{
                                                fontSize: sizeFont(3.3),
                                                color: color.fontBlack,
                                            }}>Bonus Pasive Ahmad</Text>
                                            <Text style={{
                                                fontSize: sizeFont(3),
                                                color: color.fontBlack1,
                                            }}>Bonus Pasive Ahmad</Text>
                                        </View>
                                    </View>
                                    <Text style={{
                                        fontSize: sizeFont(3.5),
                                        fontFamily: Poppins.Medium,
                                        color: color.mainColor,
                                    }}>BV: 1.200</Text>
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
});
