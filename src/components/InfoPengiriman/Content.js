/* eslint-disable react-native/no-inline-styles */
import Clipboard from '@react-native-community/clipboard';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { color } from '../../assets/colors/Index';
import { sizeFont, sizeHeight, sizeWidth } from '../../assets/responsive';
import { ToasSuccess } from '../../config/function';
import Timeline from 'react-native-timeline-flatlist';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Poppins } from '../../assets/fonts';

export default function Content({ dataOrder, dataTracking }) {

    const status_pengiriman = dataOrder !== null ? dataOrder.status_pengiriman : null;
    const no_resi = dataOrder !== null ? dataOrder.no_resi : null;
    const delivery_status = dataTracking !== null && dataTracking.result !== undefined ? dataTracking.result.delivery_status : null;

    const [dataTrack, setDataTrack] = useState(null);

    const SalinAccount = () => {
        Clipboard.setString(no_resi.toString());
        ToasSuccess('Berhasil disalin');
    };

    console.log(dataTracking);

    const handleDataTracking = useCallback(() => {
        if (dataTracking !== null) {
            if (dataTracking.result !== undefined) {
                const manifest = dataTracking.result.manifest;
                const newData = [];
                manifest.forEach(element => {
                    const data = {
                        time: element.manifest_date !== undefined && element.manifest_time,
                        title: element.city_name,
                        description: element.manifest_date !== undefined && element.manifest_date,
                    };
                    newData.push(data);
                });
                // console.log(newData);
                setDataTrack(newData);
            }
        }
    }, [dataTracking]);

    useEffect(() => {
        handleDataTracking();
        return () => {
            // setDataTrack(null);
        };
    }, [handleDataTracking]);

    return (
        <View style={styles.Container}>
            <View style={styles.Content}>
                {
                    status_pengiriman === 'pending' ?
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: sizeWidth(3),
                        }}>
                            <Text style={{
                                fontSize: sizeFont(3.5),
                            }}>Status Pengirman</Text>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={{
                                    fontSize: sizeFont(3.5),
                                    color: color.mainColor,
                                }}>Pending</Text>
                            </View>
                        </View>
                        :
                        <View>
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
                                    }}>{no_resi}</Text>
                                    <Text
                                        onPress={() => SalinAccount()}
                                        style={{
                                            fontSize: sizeFont(3.5),
                                            color: color.mainColor,
                                            marginLeft: sizeWidth(2),
                                        }}>SALIN</Text>
                                </View>
                            </View>
                            {
                                delivery_status !== null &&
                                delivery_status.pod_receiver !== undefined &&
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: sizeWidth(3),
                                    }}>
                                        <Text style={{
                                            fontSize: sizeFont(3.5),
                                            color: color.fontBlack,
                                        }}>Penerima</Text>
                                        <Text style={{
                                            fontSize: sizeFont(3.5),
                                            color: color.mainColor,
                                        }}>{delivery_status.pod_receiver}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: sizeWidth(3),
                                    }}>
                                        <Text style={{
                                            fontSize: sizeFont(3.5),
                                            color: color.fontBlack,
                                        }}>Tanggal terima</Text>
                                        <Text style={{
                                            fontSize: sizeFont(3.5),
                                            color: color.mainColor,
                                        }}>{delivery_status.pod_receiver !== undefined && delivery_status.pod_date}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: sizeWidth(3),
                                    }}>
                                        <Text style={{
                                            fontSize: sizeFont(3.5),
                                            color: color.fontBlack,
                                        }}>Jam terima</Text>
                                        <Text style={{
                                            fontSize: sizeFont(3.5),
                                            color: color.mainColor,
                                        }}>{delivery_status.pod_receiver !== undefined && delivery_status.pod_time}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                }
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
                {
                    no_resi !== null ?
                        <View style={{
                            flex: 1,
                        }}>
                            <View style={{
                                // borderWidth: 1,
                                // width: sizeWidth(50),
                                height: sizeWidth(30),
                                alignItems: 'center',
                            }}>
                                {
                                    dataTracking !== null ?
                                        <>
                                            {
                                                dataTracking.status === 0 ?
                                                    <Image
                                                        resizeMethod="auto"
                                                        source={require('../../assets/images/loading/alert.gif')}
                                                        style={{
                                                            resizeMode: 'contain',
                                                            width: '60%',
                                                            height: '60%',
                                                            marginTop: heightPercentageToDP(4),
                                                        }}
                                                    />
                                                    :
                                                    <>
                                                        {
                                                            status_pengiriman !== null &&
                                                                status_pengiriman === 'delivery' ?
                                                                <Image
                                                                    resizeMethod="auto"
                                                                    source={require('../../assets/images/loading/delivery.gif')}
                                                                    style={{
                                                                        resizeMode: 'contain',
                                                                        width: '100%',
                                                                        height: '100%',
                                                                    }}
                                                                />
                                                                :
                                                                <Image
                                                                    resizeMethod="auto"
                                                                    source={require('../../assets/images/loading/deliferystatus.gif')}
                                                                    style={{
                                                                        resizeMode: 'contain',
                                                                        width: '100%',
                                                                        height: '100%',
                                                                    }}
                                                                />
                                                        }
                                                    </>
                                            }
                                        </>
                                        :
                                        <Image
                                            resizeMethod="auto"
                                            source={require('../../assets/images/loading/loading.gif')}
                                            style={{
                                                resizeMode: 'contain',
                                                width: '100%',
                                                height: '100%',
                                                marginTop: heightPercentageToDP(4),
                                            }}
                                        />
                                }
                            </View>
                            {
                                dataTracking !== null &&
                                <>{
                                    dataTracking.status === 0 ?
                                        <View style={{
                                            alignItems: 'center',
                                            flex: 1,
                                            paddingHorizontal: sizeWidth(5),
                                        }}>
                                            <Text style={{
                                                fontSize: sizeFont(3.5),
                                                color: color.fontBlack1,
                                                textAlign: 'center',
                                            }}>{dataTracking.description}</Text>
                                        </View>
                                        :
                                        <Timeline
                                            circleSize={20}
                                            circleColor={color.mainColor}
                                            lineColor={color.border2}
                                            timeContainerStyle={{
                                                minWidth: 52,
                                            }}
                                            // timeStyle={{ textAlign: 'center', backgroundColor: color.mainColor, color: 'white', padding: 5, borderRadius: 13 }}
                                            descriptionStyle={{
                                                color: 'gray',
                                                fontSize: sizeFont(3.3),
                                            }}
                                            options={{
                                                style: {
                                                    marginLeft: sizeWidth(5),
                                                },
                                            }}
                                            data={dataTrack}
                                            titleStyle={{
                                                fontSize: sizeFont(3.3),
                                                color: color.mainColor,
                                            }}
                                            timeStyle={{
                                                fontSize: sizeFont(3.5),
                                                color: color.mainColor,
                                            }}
                                        />}
                                </>
                            }

                        </View>
                        :
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            <Image
                                resizeMethod="auto"
                                source={require('../../assets/images/loading/pending.gif')}
                                style={{
                                    resizeMode: 'contain',
                                    width: sizeWidth(60),
                                    height: sizeWidth(60),
                                }}
                            />
                            <Text style={{
                                fontSize: sizeFont(3.5),
                                color: color.fontBlack1,
                            }}>Paket sedang diproses</Text>
                        </View>
                }
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
