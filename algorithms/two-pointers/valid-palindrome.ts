// 5️⃣ Valid Palindrome
//
// Ai un string s.
//
//     Determină dacă este palindrom, ignorând:
//
// caractere non-alfanumerice
//
// diferența dintre litere mari și mici
//
// Exemplu:
//     Input: "A man, a plan, a canal: Panama"
// Output: true
// Input: "race a car"
// Output: false

function isValidPalindrome(s: string): boolean {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, "");

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        } else {
            left++;
            right--;
        }
    }
    return true;
}