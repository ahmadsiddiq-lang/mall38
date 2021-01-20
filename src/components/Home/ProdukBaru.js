import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { SCREEN_WIDTH, sizeHeight, sizeWidth } from '../../assets/responsive';
import CardProdukVer from '../CardProdukVer';

export default function ProdukBaru({ navigation, dataProduk }) {
    return (
        <View style={styles.Container}>
            <View style={styles.BoxLable}>
                <Image
                    resizeMethod="auto"
                    style={styles.ImageLable} source={require('../../assets/images/banner/Produk-Baru.png')} />
            </View>
            <View style={styles.ContainerCard}>
                {
                    dataProduk &&
                    dataProduk.slice(10, 16).map((item, index) => {
                        return (
                            <View key={index} style={styles.BoxCard}>
                                <CardProdukVer
                                    lableNew={true}
                                    lableRedy={true}
                                    navigation={navigation}
                                    item={item} />
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
        marginVertical: sizeHeight(0.5),
        paddingVertical: sizeHeight(1),
        // borderWidth: 1,
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
    Head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: sizeWidth(5),
    },
    ContainerCard: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: sizeWidth(2.5),
        backgroundColor: color.bgWhite,
        marginTop: sizeHeight(1),
    },
    BoxCard: {
        width: (SCREEN_WIDTH / 2) - sizeWidth(2.5),
    },
});
