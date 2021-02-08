import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { color } from '../../../assets/colors/Index';
import Headers from '../../Header/Headers';
import { SyaratDanKetentuan } from '../../../config/DataDummy';
import { sizeFont, sizeWidth } from '../../../assets/responsive';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Poppins } from '../../../assets/fonts';

export default function Syarat({ navigation }) {


    const renderItem = ({ item }) => {
        return (
            <View>
                <Text style={{
                    fontSize: sizeFont(3.5),
                    fontFamily: Poppins.Medium,
                    marginBottom: hp(1),
                }}>{item.title}</Text>
                {
                    item.body !== null &&
                    <Text style={{
                        fontSize: sizeFont(3.5),
                        marginBottom: hp(1),
                    }}>{item.body.title}</Text>
                }
                {
                    item.body.itemBody !== null &&
                    item.body.itemBody.map((itemBody, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    marginBottom: hp(1),
                                }}
                            >
                                <Text style={{
                                    fontSize: sizeFont(3.3),
                                }}>{itemBody.text}</Text>
                            </View>
                        );
                    })
                }
            </View>
        );
    };

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Syarat & Ketentuan'}
            />
            <View>
                <FlatList
                    data={SyaratDanKetentuan}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{
                        paddingHorizontal: sizeWidth(5),
                        paddingTop: hp(3),
                        paddingBottom: hp(10),
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: color.bgWhite,
    },
});
