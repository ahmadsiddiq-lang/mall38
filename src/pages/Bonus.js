import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Headers from '../components/Header/Headers';
import Saldo from '../components/Bonus/Saldo';
import History from '../components/Bonus/History';

export default function Bonus({ navigation, route }) {

    const title = route.params.title !== undefined ? route.params.title : null;
    const pageStatus = route.params.pageStatus !== undefined ? route.params.pageStatus : null;
    const dataWallet = route.params.dataWallet !== undefined ? route.params.dataWallet : null;
    const dataHistoryWallet = route.params.dataHistoryWallet !== undefined ? route.params.dataHistoryWallet : null;

    const [dataHostory, setHistory] = useState(null);
    // const date = [
    //     {m:0,}
    // ]

    const getMount = () => {
        // const m = new Date('2021-01-22 07:49:34').getMonth();
        // const y = new Date('2021-01-22 07:49:34').getFullYear();
        if (dataHistoryWallet) {
            let year = [];
            dataHistoryWallet.forEach(element => {
                const m = new Date(element.tanggal_pembayaran).getFullYear();
                // year.push(m)
                if (m === 2021) {
                    year.push(element);
                }
            });
            let mount = [];
            year.forEach(element => {
                const m = new Date(element.tanggal_pembayaran).getMonth();
                // year.push(m)
                if (m === 0) {
                    mount.push(element);
                }
            });
            setHistory(mount);
            // console.log(mount);
        }
    };


    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={title}
            />
            <Saldo
                getMount={getMount}
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
