import React from 'react';
import { StyleSheet, View } from 'react-native';
import Headers from '../components/Header/Headers';
import Content from '../components/InfoPengiriman/Content';
import ProdukInfo from '../components/InfoPengiriman/ProdukInfo';

export default function InfoPengiriman({ navigation, route }) {

    const dataOrder = route.params.dataOrder;
    // console.log(dataOrder);

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Info Pengiriman'}
            />
            <ProdukInfo
                dataOrder={dataOrder}
            />
            <Content />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
