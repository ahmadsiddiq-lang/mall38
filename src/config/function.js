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
