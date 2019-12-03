import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "./input.txt"))
});

let ops: string;

rl.on('line', (line: string) => ops = JSON.stringify(line.split(',').map(num => parseInt(num))));

rl.on('close', () => {
    
})