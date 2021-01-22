import React from 'react';
import { StyleSheet, View } from 'react-native';
import Headers from '../components/Header/Headers';
import Saldo from '../components/Bonus/Saldo';
import History from '../components/Bonus/History';

export default function Bonus({ navigation, route }) {

    const title = route.params.title !== undefined ? route.params.title : null;
    const pageStatus = route.params.pageStatus !== undefined ? route.params.pageStatus : null;
    const dataWallet = route.params.dataWallet !== undefined ? route.params.dataWallet : null;
    const dataHistoryWallet = route.params.dataHistoryWallet !== undefined ? route.params.dataHistoryWallet : null;

    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={title}
            />
            <Saldo
                dataWallet={dataWallet}
                dataHistoryWallet={dataHistoryWallet}
            />
            <History
                dataHistoryWallet={dataHistoryWallet}
                pageStatus={pageStatus}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
