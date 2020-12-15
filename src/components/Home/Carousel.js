/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREEN_WIDTH, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Carousel({ navigation }) {

    const scrollRef = React.useRef();

    const [indexOf, setIndexOf] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexOf(indexOf === [1, 2, 3, 4].length - 1 ? 0 : indexOf + 1);
            scrollRef.current.scrollTo({
                animatde: true,
                y: 0,
                x: SCREEN_WIDTH * indexOf,
            });
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, [indexOf]);


    return (
        <View style={styles.Container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                // onMomentumScrollEnd={handleSetIndex()}
                ref={scrollRef}
            >
                <View style={{
                    flexDirection: 'row',
                }}>
                    {
                        [1, 2, 3, 4, 5, 6, 6].map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                style={styles.BoxImage}
                            >
                                <Image resizeMethod="auto" style={styles.Image} source={require('../../assets/images/banner/Banner1.png')} />
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
        // height: sizeHeight(18),
        // borderWidth: 1,
    },
    Image: {
        width: SCREEN_WIDTH,
        height: sizeHeight(17),
    },
    BoxImage: {
        overflow: 'hidden',
        width: SCREEN_WIDTH,
        height: sizeHeight(17),
        // borderWidth: 1,
        borderRadius: 8,
    },
});
