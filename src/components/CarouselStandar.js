import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { sizeHeight, sizeWidth } from '../assets/responsive';

export default function CarouselStandar({ dataCarousel, ShimmerPlaceHolder, visible, CarouselUp }) {

    const fakeData = [1, 2];

    const finterData = () => {
        return dataCarousel.filter(item => item.position === 'center');
    };
    const data = finterData();
    return (
        <View style={styles.Container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.Content}>
                    {
                        visible ?
                            data.map((item, index) => {
                                return (
                                    <View key={index} style={styles.BoxImage}>
                                        <Image resizeMethod="auto"
                                            style={styles.Image}
                                            source={{ uri: item.image }} />
                                    </View>
                                );
                            })
                            :
                            fakeData.map((item, index) => {
                                return (
                                    <View key={index} style={[styles.BoxImage, {
                                        marginTop: sizeHeight(2),
                                    }]}>
                                        <ShimmerPlaceHolder
                                            ref={CarouselUp}
                                            visible={visible}
                                            style={styles.Image}
                                        />
                                    </View>
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
    },
    Content: {
        marginHorizontal: sizeWidth(2.5),
        flexDirection: 'row',
    },
    BoxImage: {
        marginHorizontal: sizeWidth(2.5),
        width: sizeWidth(75),
        height: sizeWidth(25),
        overflow: 'hidden',
    },
    Image: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});
