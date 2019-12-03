import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "./input.txt"))
});

let firstWire;
let secondWire;
rl.on('line', (line: string) => {
    if(! firstWire) {
        firstWire = line;
    } else {
        secondWire = line
    }
});

rl.on('close', () => {
    
})