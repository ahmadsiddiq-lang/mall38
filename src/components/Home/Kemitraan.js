/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { Poppins } from '../../assets/fonts';
import { color } from '../../assets/colors/Index';
import CardProduk, { CardEnd } from '../CardProduk';
// import CountDown from 'react-native-countdown-component';
// import moment from 'moment';

export default function Kemitraan({ navigation, dataProduk, barStatus, visibleFlashSale, ShimmerPlaceHolder }) {

    // const [totalDuration, setTotalDuration] = useState(0);

    const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // useEffect(() => {
    //     // Coundown timer for a given expiry date-time
    //     let date =
    //         moment()
    //             .utcOffset('+05:30')
    //             .format('YYYY-MM-DD hh:mm:ss');

    //     // Getting the current date-time
    //     // You can set your own date-time
    //     let expirydate = '2021-1-18 23:00:45';

    //     let diffr =
    //         moment
    //             .duration(moment(expirydate)
    //                 .diff(moment(date)));
    //     // Difference of the expiry date-time
    //     var hours = parseInt(diffr.asHours());
    //     var minutes = parseInt(diffr.minutes());
    //     var seconds = parseInt(diffr.seconds());

    //     // Converting in seconds
    //     var d = hours * 60 * 60 + minutes * 60 + seconds;

    //     // Settign up the duration of countdown
    //     setTotalDuration(d);
    // }, []);

    const renderItem = (item, index) => {
        return (
            <View
                key={index}
            >
                <CardProduk
                    lableNew={true}
                    lableRedy={true}
                    navigation={navigation}
                    item={item}
                    barStatus={barStatus}
                />
            </View>
        );
    };
    const renderItemShimer = (_, index) => {
        return (
            <View
                key={index}
                style={styles.CardProduk}
            >
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: color.border2,
                        borderRadius: 8,
                        marginHorizontal: sizeWidth(2.5),
                        width: sizeWidth(40),
                        height: sizeHeight(25),
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        alignItems: 'center',
                        padding: sizeWidth(2),
                    }}>
                        <ShimmerPlaceHolder
                            style={{
                                width: sizeWidth(25),
                                height: sizeWidth(25),
                                borderRadius: 100,
                            }}
                        />
                        <ShimmerPlaceHolder
                            style={{
                                width: sizeWidth(35),
                                height: sizeWidth(3),
                                borderRadius: 100,
                                marginTop: sizeHeight(2),
                            }}
                        />
                        <ShimmerPlaceHolder
                            style={{
                                width: sizeWidth(35),
                                height: sizeWidth(3),
                                borderRadius: 100,
                                marginTop: sizeHeight(2),
                            }}
                        />
                        <ShimmerPlaceHolder
                            style={{
                                width: sizeWidth(35),
                                height: sizeWidth(3),
                                borderRadius: 100,
                                marginTop: sizeHeight(2),
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View
            style={styles.Container}
        >
            <View style={styles.Content}>
                <View style={{
                    // marginVertical: sizeHeight(1),
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: sizeHeight(1),
                }}>
                    <ShimmerPlaceHolder
                        visible={visibleFlashSale}
                        style={styles.BoxLable}>
                        <Image
                            resizeMethod="auto"
                            style={styles.ImageLable} source={require('../../assets/images/banner/Produk-Kemitraan.png')} />
                    </ShimmerPlaceHolder>
                    {/* {
                        visibleFlashSale &&
                        <View style={{
                            marginLeft: sizeWidth(5),
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                                color: color.fontBlack1,
                            }}>Berakhir dalam</Text>
                            <CountDown
                                size={sizeFont(3)}
                                until={totalDuration}
                                onFinish={() => alert('Finished')}
                                digitStyle={{ backgroundColor: color.mainColor }}
                                digitTxtStyle={{ color: color.fontWhite }}
                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                separatorStyle={{ color: '#1CC625' }}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                showSeparator
                            />
                        </View>
                    } */}
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    <View style={styles.ContainerProduk}>
                        {dataProduk != null &&
                            visibleFlashSale ?
                            dataProduk.slice(0, 10).map(renderItem) : fakeData.map(renderItemShimer)}
                        <CardEnd
                            onPressLihatSemua={() => navigation.navigate('ListProduk', {
                                dataProduk: dataProduk,
                                title: 'Produk Mitra',
                            })}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        // padding: sizeWidth(5),
        marginVertical: sizeHeight(0.5),
    },
    Content: {
        backgroundColor: color.bgWhite,
    },
    BoxTime: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: color.bgBlack3,
        borderRadius: 8,
        paddingVertical: sizeWidth(1.5),
    },
    BoxItemTime: {
        // borderWidth: 1,
        backgroundColor: color.mainColor,
        paddingHorizontal: sizeWidth(2),
        borderRadius: 5,
    },
    TextTime: {
        fontSize: sizeFont(3.3),
        fontFamily: Poppins.Bold,
        color: color.fontWhite,
    },
    ContainerProduk: {
        flexDirection: 'row',
        marginHorizontal: sizeWidth(3),
        marginBottom: sizeHeight(1),
    },
    BoxLable: {
        overflow: 'hidden',
        width: sizeWidth(45),
        height: sizeWidth(15),
        marginLeft: sizeWidth(5),
    },
    ImageLable: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});
