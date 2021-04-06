/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, StyleSheet, Text, View, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { color } from '../assets/colors/Index';
import { Poppins } from '../assets/fonts';
import { SCREEN_WIDTH, sizeFont } from '../assets/responsive';

const image = [
    {
        title: 'Produk Berkualitas',
        sub: 'Mall 38 menyediakan lebih dari 1000 produk berkualitas dari brand ternama.',
        image: require('../assets/images/Splash/Image1.png'),
    },
    {
        title: 'Pengiriman Aman',
        sub: 'Kami menjamin produk yang dibeli sampai ditangan Anda dengan aman.',
        image: require('../assets/images/Splash/Image2.png'),
    },
    {
        title: 'Dapat Profit',
        sub: 'Belanja di Mall 38 Anda bisa mendapatkan profit tambahan.',
        image: require('../assets/images/Splash/Image3.png'),
    },
];

export default function Splash({ navigation }) {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const scrollRef = React.useRef();

    const handleNext = (index) => {
        scrollRef.current.scrollToIndex({ index: index < 2 ? index + 1 : 0 });
    };

    const navigate = async () => {
        navigation.navigate('Login');
        await AsyncStorage.setItem('splash', 'false');
    };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                snapToInterval={SCREEN_WIDTH}
                decelerationRate="fast"
                horizontal
                ref={scrollRef}
                data={image}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            flex: 1,
                            width: SCREEN_WIDTH,
                        }}>
                            <Image
                                source={item.image}
                                style={{
                                    resizeMode: 'contain',
                                    width: SCREEN_WIDTH,
                                    height: heightPercentageToDP(30),
                                    marginTop: heightPercentageToDP(15),
                                }}
                            />
                            <View style={{
                                marginTop: heightPercentageToDP(20),
                                flex: 1,
                                paddingHorizontal: widthPercentageToDP(5),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(7),
                                    fontFamily: Poppins.Medium,
                                    color: color.mainColor,
                                    textAlign: 'center',
                                }}>{item.title}</Text>
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                    textAlign: 'center',
                                    marginTop: heightPercentageToDP(2),
                                }}>{item.sub}</Text>
                            </View>
                            <View style={{
                                position: 'absolute',
                                right: 0,
                                bottom: heightPercentageToDP(4),
                                paddingHorizontal: widthPercentageToDP(5),
                            }}>
                                <TouchableOpacity
                                    onPress={() => index < 2 ? handleNext(index) : navigate()}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: color.mainColor,
                                        paddingHorizontal: widthPercentageToDP(5),
                                        paddingVertical: widthPercentageToDP(1),
                                        borderRadius: 30,
                                    }}>
                                    <Text style={{
                                        fontSize: sizeFont(3.5),
                                        color: color.fontWhite,
                                        fontFamily: Poppins.Medium,
                                    }}>{index < 2 ? 'Next' : 'Start'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />
            <View style={styles.pagination}>
                {image.map((_, index) => {
                    return <View
                        key={index}
                        style={styles.dot}
                    />;
                })}
                <Animated.View style={[styles.dotIndicator, {
                    transform: [{
                        translateX: Animated.divide(scrollX, SCREEN_WIDTH).interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 20],
                        }),
                    }],
                }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    pagination: {
        position: 'absolute',
        bottom: heightPercentageToDP(5),
        left: widthPercentageToDP(5),
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: color.bgBlack2,
        marginRight: 16,
    },
    dotIndicator: {
        width: 20,
        height: 10,
        borderRadius: 16,
        backgroundColor: color.mainColor,
        position: 'absolute',
        left: -4 / 2,
    },
});
