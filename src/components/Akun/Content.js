/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../../assets/fonts';
import { AreaChart, Grid, LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Defs } from 'react-native-svg';
import { LinearGradient } from 'react-native-svg';
import { Stop } from 'react-native-svg';
import { Path } from 'react-native-svg';
import Menu from './Menu';

export default function Content({ navigation, handleNavEditUser }) {

    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

    const Line = ({ line }) => (
        <Path
            key={'line'}
            d={line}
            stroke={'rgb(134, 65, 244)'}
            fill={'none'}
        />
    );
    return (
        <View style={styles.Container}>
            <Text style={{
                fontSize: sizeFont(3.5),
                fontFamily: Poppins.Medium,
                marginLeft: sizeWidth(5),
            }}>Laporan Pendapatan</Text>
            <View style={{
                marginHorizontal: sizeWidth(5),
                marginTop: sizeHeight(2),
                flexDirection: 'row',
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Bonus', {
                        title: 'Bonus Active',
                    })}
                    activeOpacity={0.8}
                    style={{
                        flex: 1,
                        marginRight: sizeWidth(5),
                        backgroundColor: color.bgBlack4,
                    }}>
                    <View style={{
                        padding: sizeWidth(2),
                    }}>
                        <View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 30,
                            backgroundColor: color.mainColor,
                        }} />
                        <Text style={{
                            fontSize: sizeFont(4),
                            marginTop: sizeHeight(0.5),
                        }}>Rp. 50.500</Text>
                        <Text style={{
                            fontSize: sizeFont(3.3),
                            color: color.fontBlack1,
                        }}>Bonus Active</Text>
                    </View>
                    <View>
                        <AreaChart
                            style={{ height: sizeHeight(8) }}
                            data={data}
                            contentInset={{ top: 5, bottom: 5 }}
                            curve={shape.curveNatural}
                            svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                        >
                            <Line />
                        </AreaChart>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Bonus', {
                            title: 'Bonus Pasif',
                        })}
                        activeOpacity={0.8}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: color.bgBlack4,
                            marginBottom: sizeHeight(1),
                            paddingHorizontal: sizeWidth(3),
                            justifyContent: 'space-between',
                        }}>
                        <View>
                            <Text style={{
                                fontSize: sizeFont(4),
                                marginTop: sizeHeight(0.5),
                            }}>Rp. 50.500</Text>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack1,
                            }}>Bonus Pasif</Text>
                        </View>
                        <Image resizeMethod="auto" style={{
                            resizeMode: 'contain',
                            width: sizeWidth(10),
                            height: sizeWidth(10),
                            marginLeft: sizeWidth(5),
                        }} source={require('../../assets/images/pageAkun/Bonus-Passive.png')} />
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                        backgroundColor: color.bgBlack4,
                        paddingHorizontal: sizeWidth(3),
                        justifyContent: 'space-between',
                    }}>
                        <View>
                            <Text style={{
                                fontSize: sizeFont(4),
                                marginTop: sizeHeight(0.5),
                            }}>4.500</Text>
                            <Text style={{
                                fontSize: sizeFont(3.3),
                                color: color.fontBlack1,
                            }}>Point</Text>
                        </View>
                        <Image resizeMethod="auto" style={{
                            resizeMode: 'contain',
                            width: sizeWidth(10),
                            height: sizeWidth(10),
                            marginLeft: sizeWidth(5),
                        }} source={require('../../assets/images/pageAkun/Point.png')} />
                    </View>
                </View>
            </View>
            <View style={{
                marginTop: sizeHeight(2),
                backgroundColor: color.bgBlack4,
                marginHorizontal: sizeWidth(5),
                padding: sizeWidth(3),
            }}>
                <Text style={{
                    fontSize: sizeFont(3.5),
                }}>Reward</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.mainColor,
                    }}>Rp. 0</Text>
                    <Text style={{
                        fontSize: sizeFont(4),
                        color: color.mainColor,
                    }}>Rp. 50.000.000</Text>
                </View>
                <View style={{
                    height: 8,
                    backgroundColor: color.bgBlack2,
                    marginVertical: sizeHeight(1),
                    borderRadius: 20,
                    overflow: 'hidden',
                }}>
                    <View style={{
                        height: '100%',
                        width: '80%',
                        backgroundColor: color.mainColor,
                    }} />
                </View>
                <Text style={{
                    fontSize: sizeFont(3.3),
                    color: color.fontBlack1,
                }}>* Anda berkesempatan mendapat Handphone</Text>
            </View>
            <View style={{
                height: 10,
                backgroundColor: color.bgBlack4,
                marginVertical: sizeHeight(2),
            }} />
            <Menu
                handleNavEditUser={handleNavEditUser}
                navigation={navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
