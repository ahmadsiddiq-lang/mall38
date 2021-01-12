/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { color } from '../../assets/colors/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Riwayat({ navigation, handleButtonRiwayat }) {

    const [dataRiwayat, setRiwayat] = useState([]);

    const getRiwayat = useCallback(async () => {
        try {
            const myArray = await AsyncStorage.getItem('riwayat');
            if (myArray !== null) {
                // We have data!!
                const data = JSON.parse(myArray);
                if (data.length > 6) {
                    const newData = [];
                    data.splice(0, 1);
                    newData.push(...data);
                    await AsyncStorage.removeItem('riwayat');
                    await AsyncStorage.setItem('riwayat', JSON.stringify(newData));
                }
                setRiwayat(data.reverse());
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }, []);

    const hapusRiwayat = async () => {
        try {
            await AsyncStorage.removeItem('riwayat');
        } catch (err) {
            //
        }
    };

    useEffect(() => {
        getRiwayat();

    }, [getRiwayat]);

    return (
        <View style={styles.Container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: sizeWidth(5),
                marginTop: sizeHeight(2),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                }}>Riwayat Pencarian</Text>
                <TouchableOpacity
                    onPress={() => hapusRiwayat()}
                    activeOpacity={0.8}
                >
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        color: color.mainColor,
                    }}>Hapus</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.BoxRiwayat}>
                {
                    dataRiwayat.length > 0 &&
                    dataRiwayat.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    handleButtonRiwayat(item);
                                }}
                                key={index}
                                activeOpacity={0.8}
                                style={styles.content}>
                                <Text style={{
                                    fontSize: sizeFont(3.3),
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
        borderBottomWidth: 1,
        borderBottomColor: color.border3,
        paddingBottom: sizeHeight(1),
    },
    BoxRiwayat: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: sizeWidth(3),
        paddingVertical: sizeHeight(1),
    },
    content: {
        borderWidth: 1,
        borderColor: color.border2,
        borderRadius: 30,
        paddingHorizontal: sizeWidth(5),
        marginHorizontal: sizeWidth(2),
        marginVertical: sizeHeight(1),
    },
});
