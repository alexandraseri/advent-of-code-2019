const passwordRange = [356261,846303];

const potentialPasswords = [];

const hasDoubleDigits = (num: number) => {
    return new Set(num.toString().split('')).size < num.toString().length;
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
    if(hasDoubleDigits(i) && hasIncreasingValues(i)){
        potentialPasswords.push(i);
    }
}

console.log(potentialPasswords.length);
