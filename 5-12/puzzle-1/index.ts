import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "./input.txt"))
});

let ops: number[] = [];

rl.on('line', (line: string) => ops = line.split(',').map(num => parseInt(num)));


rl.on('close', () => {
    ops[1] = 12;
    ops[2] = 2;
    let step = 0;
    while(ops[step] !== 99 && ops.length > step) {
        switch(ops[step]) {
            case 1: 
                ops[ops[step+3]] = ops[ops[step+1]] + ops[ops[step+2]]
                break;
            case 2: 
                ops[ops[step+3]] = ops[ops[step+1]] * ops[ops[step+2]]
                break;
            case 3: 
                break;
                
        }

        step += 4;
    }

    console.log(ops[0])
})
  