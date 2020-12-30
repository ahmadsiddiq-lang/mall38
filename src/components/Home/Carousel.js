/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { SCREEN_WIDTH, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Carousel({ navigation, dataCarousel = [] }) {

    const scrollRef = React.useRef();

    const finterData = () => {
        return dataCarousel.filter(item => item.position === 'mobile');
    };

    const data = finterData();

    const [indexOf, setIndexOf] = useState(0);

    useEffect(() => {
        const lenghtData = data.length;
        const interval = setInterval(() => {
            setIndexOf(indexOf === lenghtData - 1 ? 0 : indexOf + 1);
            scrollRef.current.scrollTo({
                animatde: true,
                y: 0,
                x: SCREEN_WIDTH * indexOf,
            });
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, [data, indexOf]);


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
                        data.map((item, index) => {
                            // if (item.position === 'top') {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    style={styles.BoxImage}
                                >
                                    <Image resizeMethod="resize" style={styles.Image} source={{ uri: item.image }} />
                                </TouchableOpacity>
                            );
                            // }
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.CircleDiv}>
                {data &&
                    data.map((_, index) => {
                        // console.log(indexOf);
                        return (
                            <View key={index} style={[
                                styles.WhiteCircle,
                                { backgroundColor: index === indexOf ? color.bgBlack1 : color.bgWhite },
                                { width: index === indexOf ? sizeWidth(5) : 8 },
                            ]} />
                        );
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        // height: sizeHeight(18),
    },
    Image: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
    },
    BoxImage: {
        overflow: 'hidden',
        width: SCREEN_WIDTH,
        height: sizeHeight(39),
        // borderWidth: 1,
    },
    CircleDiv: {
        position: 'absolute',
        width: '100%',
        height: 15,
        bottom: sizeHeight(1),
        left: sizeWidth(5),
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    WhiteCircle: {
        height: 8,
        borderRadius: 6,
        margin: 5,
    },
});
