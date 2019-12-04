import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "./input.txt"))
});

const enum WIRE {firstWire='A', secondWire='B'};

let firstWire;
let secondWire;
const matrix = {};

rl.on('line', (line: string) => {
    if(! firstWire) {
        firstWire = line.split(',');
    } else {
        secondWire = line.split(',');
    }
});

rl.on('close', () => {
    createWirePath(firstWire, WIRE.firstWire);
    createWirePath(secondWire, WIRE.secondWire);

    const intersections = findAllIntersections();
    console.log(calculateMinCombinedSteps(intersections))
})

const createWirePath = (path: string[], wire: string) => {
    let startX = 0;
    let startY = 0;
    let totalSteps = 0;

    for (let i = 0; i < path.length; i++) {
        const step = path[i];
        const direction = step[0];
        const steps = parseInt(step.substring(1));
        switch(direction) {
            case 'U':
                goUp(steps, startX, startY, wire, totalSteps);
                startY = startY + steps;
                totalSteps = totalSteps + steps;
                break;
            case 'D':
                goDown(steps, startX, startY, wire, totalSteps);
                startY = startY - steps;
                totalSteps = totalSteps + steps;
                break;
            case 'L': 
                goLeft(steps, startX, startY, wire, totalSteps);
                startX = startX - steps;
                totalSteps = totalSteps + steps;
                break;
            case 'R':
                goRight(steps, startX, startY, wire, totalSteps);
                startX = startX + steps
                totalSteps = totalSteps + steps;
                break;
        }

    }
}

const goUp = (steps: number, startX: number, startY: number, wire: string, totalSteps: number) => {
    for (let i = 1; i <= steps; i++) {
        if(! matrix[startX]) matrix[startX] = {}
        if(! matrix[startX][startY + i]) matrix[startX][startY + i] = {steps: {}}
        matrix[startX][startY + i][wire] = true;
        matrix[startX][startY + i].steps[wire] = totalSteps + i;
    }
}

const goDown = (steps: number, startX: number, startY: number, wire: string, totalSteps: number) => {
    for (let i = 1; i <= steps; i++) {
        if(! matrix[startX]) matrix[startX] = {}
        if(! matrix[startX][startY - i]) matrix[startX][startY - i] = {steps: {}}
        matrix[startX][startY - i][wire] = true;
        matrix[startX][startY - i].steps[wire] = totalSteps + i;
    }
}

const goLeft = (steps: number, startX: number, startY: number, wire: string, totalSteps: number) => {
    for (let i = 1; i <= steps; i++) {
        if(! matrix[startX - i]) matrix[startX - i] = {}
        if(! matrix[startX - i][startY]) matrix[startX - i][startY] = {steps: {}}
        matrix[startX - i][startY][wire] = true;
        matrix[startX - i][startY].steps[wire] = totalSteps + i;
    }
}

const goRight = (steps: number, startX: number, startY: number, wire: string, totalSteps: number) => {
    for (let i = 1; i <= steps; i++) {
        if(! matrix[startX + i]) matrix[startX + i] = {}
        if(! matrix[startX + i][startY]) matrix[startX + i][startY] = {steps: {}}
        matrix[startX + i][startY][wire] = true;
        matrix[startX + i][startY].steps[wire] = totalSteps + i;
    }
}

const findAllIntersections = () => {
    const intersections: string[] = [];
    Object.keys(matrix).forEach(x => {
        Object.keys(matrix[x]).forEach(y => {
            if(matrix[x][y][WIRE.firstWire] && matrix[x][y][WIRE.secondWire]){
                intersections.push(x + ',' + y);
            }
        });
    });

    return intersections;
}

const calculateMinCombinedSteps = (intersections) => {
    let minSteps = Number.MAX_SAFE_INTEGER;
    intersections.forEach(intersection => {
        const x = parseInt(intersection.split(',')[0]);
        const y = parseInt(intersection.split(',')[1]);
        const steps = matrix[x][y].steps[WIRE.firstWire] + matrix[x][y].steps[WIRE.secondWire]
        if(steps < minSteps) {
            minSteps = steps;
        }
    });

    return minSteps;

}