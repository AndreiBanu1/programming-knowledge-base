// Reverse string

function reverseString(s: string) {
    let arr = s.split('');
    let i = 0;
    let j = arr.length-1;

    while (i < j) {
        let k = arr[j];
        arr[j] = arr[i];
        arr[i] = k;

        i++;
        j--;
    }
    return arr.join('');
}

function reverseBuiltInString(s: string) {
    return s.split('').reverse().join('');
}

console.log(reverseString("abracadabra"));