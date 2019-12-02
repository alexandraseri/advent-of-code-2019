import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "./input.txt"))
});

let ops: string;

rl.on('line', (line: string) => ops = JSON.stringify(line.split(',').map(num => parseInt(num))));

rl.on('close', () => {
    for(let i = 0; i < 100; i++) {
        for(let j = 0; j < 100; j++) {
            let clearMemory: number[] = JSON.parse(ops);
            clearMemory[1] = i;
            clearMemory[2] = j;
            const ops1 = calculateOps1(clearMemory);
            if(ops1 === 19690720){
                console.log(100 * i + j);
            }
        }
    }    
})

const calculateOps1 = (ops) => {
    let step = 0;
    while(ops[step] !== 99 && ops.length > step) {
        switch(ops[step]) {
            case 1: 
                ops[ops[step+3]] = ops[ops[step+1]] + ops[ops[step+2]]
                break;
            case 2: 
                ops[ops[step+3]] = ops[ops[step+1]] * ops[ops[step+2]]
                break;
        }
        step += 4;
    }
    return ops[0]
}
  