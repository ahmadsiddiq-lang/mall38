/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../assets/colors/Index';
import { SCREEN_HEIGHT, sizeFont } from '../assets/responsive';
import Headers from '../components/Header/Headers';
import { getMember } from '../redux/actions/Member';

export default function JaringanMember({ navigation }) {

    const dispatch = useDispatch();

    const dataUser = useSelector(state => state.dataUser.dataUser.user);
    const dataMemberHit = useSelector(state => state.dataMember.dataMember);
    const refferal_code = dataUser.refferal_code !== undefined ? dataUser.refferal_code : null;
    const nameUser = dataUser.name !== undefined ? dataUser.name : null;

    const [dataMember, setDataMember] = useState([]);
    const [loading, setLoading] = useState(false);

    // console.log(dataMemberHit);

    const pushSetLastData = useCallback(() => {
        if (dataMemberHit.length > 0) {
            const newData = [];
            dataMemberHit.forEach(item => {
                if (item.user_id !== null) {
                    newData.push({ ...item, check: false });
                }
            });

            newData[newData.length - 1].check = true;
            setDataMember(newData);
        }
    }, [dataMemberHit]);

    // console.log(dataMember);

    const getDataMember = useCallback(async () => {
        if (refferal_code !== null) {
            dispatch(getMember(refferal_code, setLoading));
        }
    }, [dispatch, refferal_code]);

    useEffect(() => {
        pushSetLastData();
        getDataMember();
        return () => {
            setDataMember([]);
        };
    }, [pushSetLastData, getDataMember]);

    return (
        <View style={styles.container}>
            <Headers
                title="Jaringan Member"
                navigation={navigation}
            />
            {
                loading > 0 ?
                    <>
                        {
                            dataMember.length > 0 ?
                                <View style={styles.content}>

                                    <View style={styles.boxUser}>
                                        <View style={[styles.boxCard, {
                                            maxWidth: wp(25),
                                            minHeight: wp(15),
                                        }]}>
                                            <View style={styles.boxDesk}>
                                                <Text style={styles.textDesk}>Parent</Text>
                                            </View>
                                            <Text numberOfLines={2} onPress={() => pushSetLastData()}>{nameUser !== null && nameUser}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.boxLine1}>
                                        <View style={styles.boxLineUser} />
                                    </View>
                                    <View style={styles.boxRight}>
                                        <ScrollView>
                                            <View style={[styles.boxRight,
                                            dataMember.length <= 8 && {
                                                // borderWidth: 1,
                                                height: SCREEN_HEIGHT - heightPercentageToDP(23),
                                            }, {
                                                marginVertical: heightPercentageToDP(2),
                                                paddingBottom: heightPercentageToDP(4),
                                            }]}>
                                                <View style={styles.boxLineGap}>
                                                    {
                                                        dataMember.length > 0 &&
                                                        dataMember.map((item, index) => {
                                                            if (dataMember.length === 1) {
                                                                return (
                                                                    <View key={index} style={styles.boxLine}>
                                                                        <View style={styles.line} />
                                                                    </View>
                                                                );
                                                            } else if (item.check === false) {
                                                                return (
                                                                    <View key={index} style={styles.boxLine}>
                                                                        <View style={styles.box} />
                                                                    </View>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </View>

                                                <View style={styles.boxMember}>
                                                    {
                                                        dataMember.length > 0 &&
                                                        dataMember.map((item, index) => {
                                                            return (
                                                                <View key={index}>
                                                                    <View style={styles.boxCard}>
                                                                        <View style={styles.boxDesk}>
                                                                            <Text style={styles.textDesk}>Member</Text>
                                                                        </View>
                                                                        <Text style={{
                                                                            fontSize: sizeFont(3.5),
                                                                        }}>{item.user_id.name}</Text>
                                                                    </View>
                                                                    {
                                                                        item.check === false &&
                                                                        <View style={styles.boxGap} />
                                                                    }
                                                                </View>
                                                            );
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                :
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        fontSize: sizeFont(4),
                                        color: color.fontBlack1,
                                    }}>Belum ada member</Text>
                                </View>
                        }
                    </>
                    :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator size="large" color={color.mainColor} />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
    content: {
        flexDirection: 'row',
        flex: 1,
    },
    boxUser: {
        flex: 1.3,
        // borderWidth: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    boxLine1: {
        flex: 0.2,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    boxLineUser: {
        borderWidth: 1,
        borderColor: color.mainColor,
    },
    boxRight: {
        flex: 2,
        flexDirection: 'row',
    },
    boxLineGap: {
        // flexDirection: 'column',
        flex: 0.3,
        // borderWidth: 1,
        justifyContent: 'center',
    },
    boxLine: {
        // borderWidth: 1,
        justifyContent: 'center',
    },
    boxMember: {
        flex: 1.2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        // borderWidth: 1,
    },
    boxCard: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: wp(5),
        borderColor: color.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: wp(12),
        minWidth: wp(25),
    },
    boxDesk: {
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: color.mainColor,
        left: -20,
        top: -15,
        backgroundColor: color.mainColor,
        width: wp(18),
        alignItems: 'center',
    },
    textDesk: {
        fontSize: sizeFont(3),
        color: color.fontWhite,
    },
    box: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        height: wp(22),
        borderColor: color.mainColor,
    },
    boxGap: {
        height: wp(10),
    },
    line: {
        borderWidth: 1,
        borderColor: color.mainColor,
    },
});
