/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight } from '../../assets/responsive';

export default function TopBar({ handleTabbarFilter }) {

    const dataBar = ['Semua', 'pending', 'cancel', 'paid', 'delivery'];
    const [curenIndex, setCurentIndex] = useState(0);

    return (
        <View style={styles.Container}>
            <View style={styles.BoxBar}>
                {
                    dataBar.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    handleTabbarFilter(item);
                                    setCurentIndex(index);
                                }}
                                key={index}
                                activeOpacity={0.8}
                                style={[styles.BtnBat,
                                curenIndex === index &&
                                {
                                    borderBottomWidth: 1.5,
                                    borderBottomColor: color.mainColor,
                                },
                                ]}
                            >
                                <Text style={{
                                    textTransform: 'capitalize',
                                    fontSize: sizeFont(3.5),
                                }}>{item}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        borderBottomWidth: 0.5,
        borderBottomColor: color.mainColor,
        backgroundColor: color.bgWhite,
        marginBottom: sizeHeight(1),
    },
    BoxBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    BtnBat: {
        paddingVertical: sizeHeight(1.5),
        flex: 1,
        alignItems: 'center',
    },
});
