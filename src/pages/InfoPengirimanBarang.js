import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../components/Header/Headers';
import Content from '../components/InfoPengiriman/Content';
import ProdukInfo from '../components/InfoPengiriman/ProdukInfo';
import { objekEmpty } from '../config/function';
import { ClearTracking, getTracking } from '../redux/actions/Produk';

export default function InfoPengiriman({ navigation, route }) {

    const dispatch = useDispatch();

    const dataTrackIngProduk = useSelector(state => state.produk.dataTracking);

    const dataOrder = route.params.dataOrder;
    const no_resi = route.params.dataOrder.no_resi;
    const courier = route.params.dataOrder.courier;

    // console.log(dataTrackIngProduk);

    const [dataTracking, setDataTracking] = useState(null);

    const setCourir = useCallback(() => {
        if (courier === 'Jalur Nugraha Ekakurir (JNE)') {
            return 'jne';
        } else if (courier === 'J&T Express') {
            return 'jnt';
        } else {
            return 'ninja';
        }
    }, [courier]);

    const handledataTracking = useCallback(() => {
        if (objekEmpty(dataTrackIngProduk)) {
            if (dataTrackIngProduk.status.code === 400) {
                const data = {
                    status: 0,
                    description: dataTrackIngProduk.status.description,
                };
                setDataTracking(data);
                // console.log(data);
            } else {
                const data = {
                    status: 1,
                    description: dataTrackIngProduk.status.description,
                    result: dataTrackIngProduk.result,
                };
                setDataTracking(data);
            }
        }
    }, [dataTrackIngProduk]);

    const getTrackingHandle = useCallback(() => {
        const data = {
            resi: no_resi,
            courier: setCourir(),
        };
        dispatch(getTracking(data));
        // console.log(data);
    }, [no_resi, setCourir, dispatch]);

    const ClearDataTrack = useCallback(() => {
        dispatch(ClearTracking());
        // console.log(data);
    }, [dispatch]);

    useEffect(() => {
        getTrackingHandle();
    }, [getTrackingHandle]);

    useEffect(() => {
        handledataTracking();
        return () => {
            ClearDataTrack(null);
        };
    }, [handledataTracking, ClearDataTrack]);



    return (
        <View style={styles.Container}>
            <Headers
                navigation={navigation}
                title={'Info Pengiriman'}
            />
            <ProdukInfo
                dataOrder={dataOrder}
            />
            <Content
                dataOrder={dataOrder}
                dataTracking={dataTracking}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
