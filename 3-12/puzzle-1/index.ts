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
    console.log(calculateManhattenDistance(intersections));
})

const createWirePath = (path: string[], wire: string) => {
    let startX = 0;
    let startY = 0;

    for (let i = 0; i < path.length; i++) {
        const step = path[i];
        const direction = step[0];
        const steps = parseInt(step.substring(1));
        switch(direction) {
            case 'U':
                goUp(steps, startX, startY, wire);
                startY = startY + steps;
                break;
            case 'D':
                goDown(steps, startX, startY, wire);
                startY = startY - steps;
                break;
            case 'L': 
                goLeft(steps, startX, startY, wire);
                startX = startX - steps;
                break;
            case 'R':
                goRight(steps, startX, startY, wire);
                startX = startX + steps
                break;
        }

    }
}

const goUp = (steps: number, startX: number, startY: number, wire: string) => {
    for (let i = 1; i <= steps; i++) {
        if(! matrix[startX]) matrix[startX] = {}
        if(! matrix[startX][startY + i]) matrix[startX][startY + i] = {}
        matrix[startX][startY + i][wire] = true;
    }
}

const goDown = (steps: number, startX: number, startY: number, wire: string) => {
    for (let i = 1; i <= steps; i++) {
        if(! matrix[startX]) matrix[startX] = {}
        if(! matrix[startX][startY - i]) matrix[startX][startY - i] = {}
        matrix[startX][startY - i][wire] = true;
    }
}

const goLeft = (steps: number, startX: number, startY: number, wire: string) => {
    for (let i = 1; i <= steps; i++) {
        if(! matrix[startX - i]) matrix[startX - i] = {}
        if(! matrix[startX - i][startY]) matrix[startX - i][startY] = {}
        matrix[startX - i][startY][wire] = true;
    }
}

const goRight = (steps: number, startX: number, startY: number, wire: string) => {
    for (let i = 1; i <= steps; i++) {
        if(! matrix[startX + i]) matrix[startX + i] = {}
        if(! matrix[startX + i][startY]) matrix[startX + i][startY] = {}
        matrix[startX + i][startY][wire] = true;
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

const calculateManhattenDistance = (intersections) => {
    let minDistance = Number.MAX_SAFE_INTEGER;
    intersections.forEach(intersection => {
        const x = parseInt(intersection.split(',')[0]);
        const y = parseInt(intersection.split(',')[1]);
        const distance = Math.abs(x) + Math.abs(y);
        if(distance < minDistance) {
            minDistance = distance;
        }
    });

    return minDistance;
}