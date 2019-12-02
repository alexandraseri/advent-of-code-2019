import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "./input.txt"))
});

const moduleMasses: string[] = [];

rl.on('line', (line: string) => moduleMasses.push(line));

rl.on('close', () => {
    let totalFuel = 0;
    moduleMasses.forEach((massString: string) => {
        const mass = parseInt(massString);
        totalFuel += calculateFuel(mass);
    });

    console.log(totalFuel);
})

function calculateFuel(mass: number): number {
    let totalFuel = 0;
    while (mass > 0) {
        mass = Math.floor(mass / 3) - 2;
        if (mass > 0) {
            totalFuel += mass;
        }
    }

    return totalFuel;
}

  