/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Categori({ dataCategori, navigation }) {

    const data = dataCategori;

    // console.log(data);

    return (
        <View style={styles.Container}>
            <View style={styles.BoxLable}>
                <Image
                    resizeMethod="auto"
                    style={styles.ImageLable}
                    source={require('../../assets/images/banner/Kategori.png')} />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.BoxCard}>
                    {
                        data &&
                        data.map((item, index) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('ProductCategori', {
                                        idCategori: item.id,
                                    })
                                }
                                key={index}
                                activeOpacity={0.8}
                                style={styles.BoxItem}
                            >
                                <View style={styles.BoxImage}>
                                    <Image resizeMethod="auto" style={styles.image} source={{ uri: item.icon }} />

                                </View>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: sizeFont(3.3),
                                    marginTop: sizeHeight(1),
                                }}>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: color.bgWhite,
        flex: 1,
        marginBottom: sizeHeight(0.5),
    },
    BoxCard: {
        width: SCREEN_WIDTH + sizeWidth(32),
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        paddingHorizontal: sizeWidth(2.5),
        paddingVertical: sizeHeight(1.5),
    },
    BoxItem: {
        alignItems: 'center',
        marginHorizontal: sizeWidth(2.5),
        width: sizeWidth(20),
        marginVertical: sizeHeight(1),
    },
    BoxImage: {
        overflow: 'hidden',
        backgroundColor: color.bgBlack3,
        borderRadius: 8,
        padding: sizeHeight(1.5),
    },
    image: {
        width: sizeWidth(6),
        height: sizeWidth(6),
    },
    BoxLable: {
        overflow: 'hidden',
        width: sizeWidth(35),
        height: sizeWidth(15),
        marginLeft: sizeWidth(5),
    },
    ImageLable: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});
