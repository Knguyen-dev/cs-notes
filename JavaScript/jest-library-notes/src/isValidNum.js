/*

We'll say a valid number is an integer in range [20 to 30]

*/
function isValidNum(n) {
    if (n >= 20 && n <= 30) {
        return true
    } else {
        return false
    }
}

export { isValidNum }
