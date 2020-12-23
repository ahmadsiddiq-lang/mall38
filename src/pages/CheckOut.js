/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../assets/colors/Index';
import Headers from '../components/Header/Headers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sizeFont, sizeHeight, sizeWidth } from '../assets/responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListProduk from '../components/CheckOut/ListProduk';
import Kurir from '../components/CheckOut/Kurir';
import MetodeBayar from '../components/CheckOut/MetodeBayar';


export default function CheckOut({ navigation, route }) {

    const dataProduk = route.params.data;
    // console.log(dataProduk);

    return (
        <View style={styles.Container}>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <Headers navigation={navigation} title={'Check Out'} />
            <ScrollView>
                <View>
                    <View style={styles.BoxAlamat}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Ionicons name="location-outline" color={color.mainColor} size={sizeFont(6)} />
                            <View style={{
                                marginLeft: sizeWidth(3),
                                flex: 1,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Text>Alamat Pengiriman</Text>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.BtnBack}
                                    >
                                        <FontAwesome5
                                            name="edit"
                                            size={sizeFont(4.5)}
                                            color={color.mainColor}
                                            light
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{
                                    marginTop: sizeHeight(1),
                                }}>The Mansion Kemayoran - Tower Fontana BH 33 1 Jakarta, East Pademangan, Pademangan, North Jakarta City, Jakarta 14410</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ContentItem}>
                        {
                            dataProduk.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <ListProduk item={item} />
                                    </View>
                                );
                            })
                        }
                    </View>
                    <View style={styles.ContentItem}>
                        <Kurir />
                        <MetodeBayar />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        elevation: 2,
    },
    BoxAlamat: {
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(2),
        backgroundColor: color.bgWhite,
        marginBottom: sizeHeight(0.5),
    },
    ContentItem: {
        marginVertical: sizeHeight(0.5),
        backgroundColor: color.bgWhite,
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeHeight(2),
    },
});
