/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../assets/colors/Index';
import { SCREEN_HEIGHT, sizeFont } from '../assets/responsive';
import Headers from '../components/Header/Headers';

const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    // { id: 7 },
    // { id: 8 },
    // { id: 9 },
    // { id: 10 },
    // { id: 11 },
    // { id: 12 },
    // { id: 13 },
    // { id: 14 },
    // { id: 15 },
    // { id: 16 },
    // { id: 17 },
    // { id: 18 },
    // { id: 19 },
    // { id: 20 },
];

export default function JaringanMember({ navigation }) {


    const [dataMember, setDataMember] = useState([]);

    const pushSetLastData = useCallback(() => {
        const last = data[data.length - 1];
        const newData = [];
        const index = data.findIndex(item => item.id === last.id);
        data.forEach(item => {
            newData.push({ ...item, check: false });
        });

        newData[index].check = true;
        // console.log(newData);
        setDataMember(newData);
    }, []);

    useEffect(() => {
        pushSetLastData();
    }, [pushSetLastData]);

    return (
        <View style={styles.container}>
            <Headers
                title="Jaringan Member"
                navigation={navigation}
            />
            <View style={styles.content}>

                <View style={styles.boxUser}>
                    <View style={styles.boxCard}>
                        <View style={styles.boxDesk}>
                            <Text style={styles.textDesk}>Parent</Text>
                        </View>
                        <Text onPress={() => pushSetLastData()}>Utama</Text>
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
                        }]}>
                            <View style={styles.boxLineGap}>
                                {
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
                                    dataMember.map((item, index) => {
                                        return (
                                            <View key={index}>
                                                <View style={styles.boxCard}>
                                                    <View style={styles.boxDesk}>
                                                        <Text style={styles.textDesk}>Member</Text>
                                                    </View>
                                                    <Text>Member</Text>
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
        flex: 1,
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
