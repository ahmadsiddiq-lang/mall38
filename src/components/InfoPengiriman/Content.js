/* eslint-disable react-native/no-inline-styles */
import Clipboard from '@react-native-community/clipboard';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { ToasSuccess } from '../../config/function';
import Timeline from 'react-native-timeline-flatlist';

export default function Content() {

    const SalinAccount = () => {
        Clipboard.setString('0929374298712389');
        ToasSuccess('Berhasil disalin');
    };

    const fakeData = [
        { time: '09:00', title: 'Paket telah sampai di jakarta', description: 'Paket telah sampai di jakarta' },
        { time: '10:45', title: 'Paket telah diproses penjual', description: 'Paket telah diproses penjual' },
    ];

    return (
        <View style={styles.Container}>
            <View style={styles.Content}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: sizeWidth(3),
                }}>
                    <Text style={{
                        fontSize: sizeFont(3.5),
                    }}>No. Resi</Text>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            fontSize: sizeFont(3.5),
                            color: color.mainColor,
                        }}>0929374298712389</Text>
                        <Text
                            onPress={() => SalinAccount()}
                            style={{
                                fontSize: sizeFont(3.5),
                                color: color.mainColor,
                                marginLeft: sizeWidth(2),
                            }}>SALIN</Text>
                    </View>
                </View>
            </View>
            <View style={{
                flex: 1,
                backgroundColor: color.bgWhite,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: color.border3,
                marginTop: sizeHeight(0.3),
                marginBottom: sizeHeight(1),
            }}>
                <Timeline
                    circleSize={20}
                    circleColor={color.mainColor}
                    lineColor={color.border2}
                    timeContainerStyle={{
                        minWidth: 52,
                    }}
                    // timeStyle={{ textAlign: 'center', backgroundColor: color.mainColor, color: 'white', padding: 5, borderRadius: 13 }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{
                        style: {
                            paddingTop: 5,
                            marginLeft: sizeWidth(5),
                            marginTop: sizeHeight(2),
                        },
                    }}
                    data={fakeData}
                />
                {/* <ScrollView>
                    <View style={{
                        marginHorizontal: sizeWidth(5),
                        marginVertical: sizeHeight(1.5),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: sizeHeight(2.5),
                        }}>
                            <View style={{
                                width: sizeWidth(13),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3),
                                    color: color.mainColor,
                                }}>13 Des 2020</Text>
                            </View>
                            <View style={{
                                width: sizeWidth(2),
                                height: sizeWidth(2),
                                backgroundColor: color.mainColor,
                                borderRadius: 100,
                            }} />
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    marginLeft: sizeWidth(3),
                                    color: color.mainColor,
                                }}>[Jakarta] Paket telah sampai di ANCOL</Text>
                            </View>
                        </View>

                        <View style={{
                            borderLeftWidth: 1,
                            borderColor: color.border2,
                            minHeight: sizeHeight(3),
                            marginLeft: sizeWidth(14),
                            position: 'absolute',
                            marginTop: sizeHeight(2),
                            zIndex: -999,
                            height: sizeHeight(8),
                        }} />

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: sizeWidth(13),
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3),
                                    color: color.fontBlack1,
                                }}>13 Des 2020</Text>
                            </View>
                            <View style={{
                                width: sizeWidth(2),
                                height: sizeWidth(2),
                                backgroundColor: color.bgBlack2,
                                borderRadius: 100,
                            }} />
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    marginLeft: sizeWidth(3),
                                    color: color.fontBlack1,
                                }}>Pesanan sedang diproses oleh penjual</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginTop: sizeHeight(1),
        paddingHorizontal: sizeWidth(5),
    },
    Content: {
        backgroundColor: color.bgWhite,
        padding: sizeWidth(2),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.border3,
    },
});
