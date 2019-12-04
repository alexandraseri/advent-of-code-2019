const passwordRange = [356261,846303];

const potentialPasswords = [];

const hasDoubleDigits = (num: number) => {
    let numOfDigit = 1;
    const str = num.toString().split(''); 
    for(let i = 0; i < str.length - 1; i++) {
        if(str[i] === str[i+1]){
            numOfDigit++;
        } else {
            if (numOfDigit === 2) {
                return true;
            }

            numOfDigit = 1;
        }
    }
    if (numOfDigit === 2) {
        return true;
    }

    return false;
}

const hasIncreasingValues = (num: number) => {
    const str = num.toString().split(''); 
    for(let i = 0; i < str.length - 1; i++){
        if(str[i] > str[i+1]) {
            return false;
        }
    }

    return true;
}

for(let i = 356261; i <= 846303; i++) {
    if(hasIncreasingValues(i) && hasDoubleDigits(i)){
        potentialPasswords.push(i);
    }
}

console.log(potentialPasswords.length);
