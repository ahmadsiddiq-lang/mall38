import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { SCREEN_WIDTH, sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function BannerCategori({ navigation, dataCategori }) {

    // console.log(dataCategori[0]);

    return (
        <View style={styles.Container}>
            <View style={styles.BoxLable}>
                <Image
                    resizeMethod="auto"
                    style={styles.ImageLable} source={require('../../assets/images/banner/Cari-Kategori-Apa.png')} />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.ContentBox}>
                    {
                        dataCategori.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        navigation.navigate('ProductCategori', {
                                            category: item,
                                        })
                                    }
                                    key={index} style={styles.BoxImage}>
                                    <Image resizeMethod="auto" style={styles.Image} source={{ uri: item.image_home }} />
                                </TouchableOpacity>
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
        marginVertical: sizeHeight(0.5),
        paddingVertical: sizeHeight(1),
    },
    BoxLable: {
        overflow: 'hidden',
        width: sizeWidth(50),
        height: sizeWidth(15),
        marginLeft: sizeWidth(5),
    },
    ImageLable: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    Head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: sizeWidth(5),
    },
    ContentBox: {
        flexDirection: 'row',
        width: SCREEN_WIDTH + sizeWidth(65),
        flexWrap: 'wrap',
        marginHorizontal: sizeWidth(2.5),
    },
    BoxImage: {
        width: sizeWidth(28),
        height: sizeWidth(30),
        borderRadius: 5,
        overflow: 'hidden',
        marginHorizontal: sizeWidth(2.4),
        marginVertical: sizeHeight(1),
    },
    Image: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});
