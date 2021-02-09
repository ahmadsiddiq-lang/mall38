import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { Poppins } from '../../assets/fonts';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import CarouselStandar from '../CarouselStandar';

export default function PromoMenarik({ dataCarousel, LinkBanner, ShimmerPlaceHolder, visible, CarouselUp }) {
    return (
        <View style={styles.Container}>
            <View style={styles.Head}>
                <Text style={{
                    fontSize: sizeFont(4),
                    fontFamily: Poppins.Medium,
                    marginLeft: sizeWidth(5),
                }}>Promo Menarik</Text>
            </View>
            <View>
                <CarouselStandar
                    LinkBanner={LinkBanner}
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
    Head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: sizeWidth(5),
        marginTop: sizeHeight(1),
    },
});
