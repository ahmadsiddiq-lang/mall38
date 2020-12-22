/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { Poppins } from '../../assets/fonts';
import { color } from '../../assets/colors/Index';
import CardProduk, { CardEnd } from '../CardProduk';

export default function FlashSale({ navigation, dataFlash, dateFlashShale, barStatus }) {

    const renderItem = (item, index) => {
        return (
            <View
                key={index}
                style={styles.CardProduk}
            >
                <CardProduk navigation={navigation} item={item} barStatus={barStatus} />
            </View>
        );
    };
    return (
        <View
            style={styles.Container}
        >
            <View style={styles.Content}>
                <View style={{
                    // marginVertical: sizeHeight(1),
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: sizeHeight(1),
                }}>
                    <View style={styles.BoxLable}>
                        <Image
                            resizeMethod="auto"
                            style={styles.ImageLable} source={require('../../assets/images/banner/flash_sale.png')} />
                    </View>
                    <View style={{
                        marginLeft: sizeWidth(5),
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.fontBlack1,
                        }}>Berakhir dalam</Text>
                        {
                            dateFlashShale ?
                                <View style={styles.BoxTime}>
                                    <View style={styles.BoxItemTime}>
                                        <Text style={styles.TextTime}>{dateFlashShale.hours}</Text>
                                    </View>
                                    <Text style={[styles.TextTime, {
                                        color: color.fontBlack,
                                        marginHorizontal: sizeWidth(2),
                                    }]}>:</Text>
                                    <View style={styles.BoxItemTime}>
                                        <Text style={styles.TextTime}>{dateFlashShale.minutes}</Text>
                                    </View>
                                    <Text style={[styles.TextTime, {
                                        color: color.fontBlack,
                                        marginHorizontal: sizeWidth(2),
                                    }]}>:</Text>
                                    <View style={styles.BoxItemTime}>
                                        <Text style={styles.TextTime}>{dateFlashShale.seconds}</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.BoxTime}>
                                    <View style={styles.BoxItemTime}>
                                        <Text style={styles.TextTime}>00</Text>
                                    </View>
                                    <Text style={[styles.TextTime, {
                                        color: color.fontBlack,
                                        marginHorizontal: sizeWidth(2),
                                    }]}>:</Text>
                                    <View style={styles.BoxItemTime}>
                                        <Text style={styles.TextTime}>00</Text>
                                    </View>
                                    <Text style={[styles.TextTime, {
                                        color: color.fontBlack,
                                        marginHorizontal: sizeWidth(2),
                                    }]}>:</Text>
                                    <View style={styles.BoxItemTime}>
                                        <Text style={styles.TextTime}>00</Text>
                                    </View>
                                </View>

                        }
                    </View>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    <View style={styles.ContainerProduk}>
                        {dataFlash &&
                            dataFlash.slice(0, 10).map(renderItem)}
                        <CardEnd />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        // padding: sizeWidth(5),
        marginVertical: sizeHeight(0.5),
    },
    Content: {
        backgroundColor: color.bgWhite,
    },
    BoxTime: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: color.bgBlack3,
        borderRadius: 8,
        paddingVertical: sizeWidth(1.5),
    },
    BoxItemTime: {
        // borderWidth: 1,
        backgroundColor: color.mainColor,
        paddingHorizontal: sizeWidth(2),
        borderRadius: 5,
    },
    TextTime: {
        fontSize: sizeFont(3.3),
        fontFamily: Poppins.Bold,
        color: color.fontWhite,
    },
    ContainerProduk: {
        flexDirection: 'row',
        marginHorizontal: sizeWidth(2),
        marginVertical: sizeHeight(2),
    },
    BoxLable: {
        overflow: 'hidden',
        width: sizeWidth(30),
        height: sizeWidth(15),
        marginLeft: sizeWidth(5),
    },
    ImageLable: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});
