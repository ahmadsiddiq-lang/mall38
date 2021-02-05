/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import base64 from 'react-native-base64';
import { color } from '../../assets/colors/Index';
import { SCREEN_WIDTH, sizeHeight, sizeWidth } from '../../assets/responsive';

export default function Carousel({ navigation, dataCarousel = [] }) {

    const scrollRef = React.useRef();

    const finterData = () => {
        return dataCarousel.filter(item => item.position === 'mobile');
    };

    const data = finterData();

    const [indexOf, setIndexOf] = useState(0);

    //setIndex
    const handleSetIndex = (e) => {
        const viewSize = e.nativeEvent.layoutMeasurement.width;
        const contentOffset = e.nativeEvent.contentOffset.x;
        const selectedIndex = Math.floor(contentOffset / viewSize);
        setIndexOf(selectedIndex);
        // console.log(selectedIndex);
    };

    const LinkBanner = (item) => {
        // console.log(item);
        if (item.id && item.title) {
            const id = base64.encode(item.id.toString());
            Linking.openURL(`https://mall38.com/detail-banner/${item.title}/${id}`);
        }
    };

    useEffect(() => {
        const lenghtData = data.length;
        const selectIndex = indexOf < lenghtData - 1 ? indexOf + 1 : 0;
        const interval = setInterval(() => {
            setIndexOf(selectIndex);
            scrollRef.current.scrollTo({
                animatde: true,
                y: 0,
                x: SCREEN_WIDTH * selectIndex,
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
                onMomentumScrollEnd={handleSetIndex}
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
                                    onPress={() => LinkBanner(item)}
                                    key={index}
                                    activeOpacity={0.9}
                                    style={styles.BoxImage}
                                >
                                    <Image resizeMethod="auto" style={styles.Image} source={{ uri: item.image }} />
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
        width: SCREEN_WIDTH,
        height: '100%',
    },
    BoxImage: {
        overflow: 'hidden',
        // width: SCREEN_WIDTH,
        // height: sizeHeight(39),
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
