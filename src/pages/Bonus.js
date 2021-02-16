import React, { useCallback, useEffect, useState } from 'react';
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

    const [date, setDate] = useState(new Date());
    const [mount, setMount] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [show, setShow] = useState(false);

    const showPicker = useCallback((value) => setShow(value), []);

    const nameMount = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juli', 'Juni', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const onValueChange = useCallback(
        (_, newDate) => {
            const selectedDate = newDate || date;

            showPicker(false);
            const m = new Date(selectedDate).getMonth();
            const y = new Date(selectedDate).getFullYear();
            setDate(selectedDate);
            setMount(m);
            setYear(y);
            filterData(m, y);
            setHistory(null);
        },
        [date, showPicker, filterData],
    );


    const filterData = useCallback((propMount, propYear) => {
        if (dataHistoryWallet) {
            let yearNew = [];
            dataHistoryWallet.forEach(element => {
                const m = new Date(element.tanggal_pembayaran).getFullYear();
                if (m === propYear) {
                    yearNew.push(element);
                }
            });
            let mountNew = [];
            yearNew.forEach(element => {
                const m = new Date(element.tanggal_pembayaran).getMonth();
                if (m === propMount) {
                    mountNew.push(element);
                }
            });
            const x = setTimeout(() => {
                setHistory(mountNew);
                return () => {
                    clearTimeout(x);
                };
            }, 1000);
            // console.log(mountNew);
        }
    }, [dataHistoryWallet]);

    useEffect(() => {
        filterData(mount, year);
    }, [mount, year, filterData]);


    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={title}
            />
            <Saldo
                date={date}
                show={show}
                mount={mount}
                year={year}
                nameMount={nameMount}
                onValueChange={onValueChange}
                showPicker={showPicker}
                dataWallet={dataWallet}
                dataHistoryWallet={dataHistoryWallet}
            />
            <History
                dataHostory={dataHostory}
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
