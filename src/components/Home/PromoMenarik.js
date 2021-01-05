import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CarouselStandar from '../CarouselStandar';

export default function PromoMenarik({ dataCarousel, navigation, ShimmerPlaceHolder, visible, CarouselUp }) {
    return (
        <View style={styles.Container}>
            <View style={styles.Head}>
                <ShimmerPlaceHolder
                    ref={CarouselUp}
                    visible={visible}
                    style={styles.BoxLable}>
                    <Image
                        resizeMethod="auto"
                        style={styles.ImageLable} source={require('../../assets/images/banner/Promo-Menarik.png')} />
                </ShimmerPlaceHolder>
                {
                    visible &&
                    <Text style={{
                        color: color.mainColor,
                        fontSize: sizeFont(3.5),
                    }}>Lihat semua</Text>
                }
            </View>
            <View>
                <CarouselStandar
                    ShimmerPlaceHolder={ShimmerPlaceHolder}
                    visible={visible}
                    CarouselUp={CarouselUp}
                    dataCarousel={dataCarousel} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
        paddingBottom: sizeHeight(1),
        marginVertical: sizeHeight(0.5),
    },
    BoxLable: {
        overflow: 'hidden',
        width: sizeWidth(40),
        height: sizeWidth(15),
        marginLeft: sizeWidth(5),
        marginTop: sizeHeight(1),
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
});
