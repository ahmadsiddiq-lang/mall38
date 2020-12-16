/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Carousel({ navigation, dataCarousel }) {

    const scrollRef = React.useRef();
    const data = dataCarousel;

    const [indexOf, setIndexOf] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setIndexOf(indexOf === [1, 2, 3, 4].length - 1 ? 0 : indexOf + 1);
            scrollRef.current.scrollTo({
                animatde: true,
                y: 0,
                x: sizeWidth(94) * indexOf,
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
                        data &&
                        data.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                style={styles.BoxImage}
                            >
                                <Image resizeMethod="auto" style={styles.Image} source={{ uri: item.image }} />
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
        marginTop: sizeHeight(2),
    },
    Image: {
        width: sizeWidth(94),
        height: sizeHeight(20),
    },
    BoxImage: {
        overflow: 'hidden',
        width: sizeWidth(94),
        height: sizeHeight(17),
        // borderWidth: 1,
        borderRadius: 8,
    },
});
