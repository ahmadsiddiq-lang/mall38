import AsyncStorage from '@react-native-async-storage/async-storage';
import { WToast } from 'react-native-smart-tip';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../assets/colors/Index';
import { sizeFont } from '../assets/responsive';
import * as React from 'react';
import { Easing } from 'react-native';

// convert to rupiah
export const rupiah = (number) => {
    var reverse = number.toString().split('').reverse().join(''),
        thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand.join('.').split('').reverse().join('');
    return thousand;
};

// hitung diskon
export const discount = (haAw, haAk) => {
    let persen = haAw - haAk;
    persen = Math.round((persen / haAw) * 100);
    return persen;
};

// mengetahui ada atau tidak isi pada objek
export const objekEmpty = (obj) => {
    return Object.keys(obj).length > 0;
};

// membuat grup pada data array
export const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
    }, {}); // empty object is the initial value for result object
};

var countDownDate = new Date('Dec 17, 2020 15:37:25').getTime();
export const countDown = () => {

    // Untuk mendapatkan tanggal dan waktu hari ini
    var now = new Date().getTime();

    // Temukan jarak antara sekarang dan tanggal hitung mundur
    var distance = countDownDate - now;

    // Perhitungan waktu untuk hari, jam, menit dan detik
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // // Jika hitungan mundur selesai, tulis beberapa teks
    // if (distance < 0) {
    //     clearInterval(countDown);
    // }
    // Keluarkan hasil dalam elemen dengan id = "demo"
    // document.getElementById('demo').innerHTML = days + 'd ' + hours + 'h '
    //     + minutes + 'm ' + seconds + 's ';
    const timeFull = {
        days: days,
        hours: hours.toString().length < 2 ? '0' + hours.toString() : hours.toString(),
        minutes: minutes.toString().length < 2 ? '0' + minutes.toString() : minutes.toString(),
        seconds: seconds.toString().length < 2 ? '0' + seconds.toString() : seconds.toString(),
        distance: distance,
    };
    return timeFull;
};

// getToken

export const getIdUser = async () => {
    await AsyncStorage.getItem('idUser')
        .then(idUser => {
            return idUser;
        }).catch(err => {
            console.log(err);
        });
};

export const ToasSuccess = (message) => {
    const toastOpts = {
        data: message,
        textColor: '#ffffff',
        backgroundColor: 'rgba(74, 74, 74,0.7)',
        duration: WToast.duration.LONG, //1.SHORT 2.LONG
        position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
        icon: <Ionicons name="checkmark-circle-outline" size={sizeFont(12)} color={color.fontWhite} />,
        inEasing: Easing.bounce,
    };

    return WToast.show(toastOpts);
};
