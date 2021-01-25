import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from '../../assets/colors/Index';
import { SCREEN_WIDTH, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Banner({ detailProduk }) {

    const [ImageBanner, setImageBanner] = useState(null);

    useEffect(() => {
        setImageBanner(detailProduk.image);
        return () => {
            setImageBanner(null);
        };
    }, [setImageBanner, detailProduk.image]);

    return (
        <View style={styles.BoxBanner}>
            <View style={styles.BoxImageBanner}>
                {
                    ImageBanner !== null ?
                        <Image resizeMethod="resize" style={styles.Image} source={{ uri: ImageBanner }} />
                        :
                        <Image resizeMethod="resize" style={styles.Image} source={require('../../assets/images/Produk/imagedefault.png')} />
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.BoxContentImage}>
                    <TouchableOpacity
                        onPress={() => setImageBanner(detailProduk.image)}
                        activeOpacity={0.8}
                        style={styles.BoxImageItem}>
                        <Image resizeMethod="resize" style={styles.Image} source={{ uri: detailProduk.image }} />
                    </TouchableOpacity>
                    {
                        detailProduk.images.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => setImageBanner(item.image)}
                                    activeOpacity={0.8}
                                    key={index} style={styles.BoxImageItem}>
                                    <Image resizeMethod="auto" style={styles.Image} source={{ uri: item.image }} />
                                    {/* <Image resizeMethod="resize" style={styles.Image} source={require('../../assets/images/Produk/imagedefault.png')} /> */}
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
    BoxBanner: {
        // borderWidth: 1,
        // height: sizeHeight(30),
        alignItems: 'center',
        backgroundColor: color.bgWhite,
    },
    Image: {
        // resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    BoxImageBanner: {
        width: SCREEN_WIDTH,
        height: sizeHeight(55),
        // borderLeftWidth: 4,
        // borderRightWidth: 4,
        // borderBottomWidth: 4,
        // borderWidth: 4,
        // borderColor: color.border1,
    },
    BoxContentImage: {
        flexDirection: 'row',
        marginHorizontal: sizeWidth(2.5),
        backgroundColor: color.bgWhite,
        paddingVertical: sizeHeight(1),
    },
    BoxImageItem: {
        width: sizeWidth(20),
        height: sizeWidth(20),
        marginTop: sizeHeight(1),
        marginHorizontal: sizeWidth(2.5),
        borderWidth: 1.5,
        borderColor: color.bgBlack2,
    },
});
