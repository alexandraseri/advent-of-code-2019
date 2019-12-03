import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "./input.txt"))
});

let ops: number[] = [];

rl.on('line', (line: string) => ops = line.split(',').map(num => parseInt(num)));

rl.on('close', () => {
    
})
  