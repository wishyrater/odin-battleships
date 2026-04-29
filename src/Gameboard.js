import Ship from "./Ship";

export default class Gameboard {
    constructor() {
        // on creation, make a 10x10 grid with empty cells
        this.grid = [];
        for (let y = 0; y < 10; y++) {
            this.grid[y] = [];
            for (let x = 0; x < 10; x++) {
                this.grid[y][x] = null;
            }
        }
    }

    getCell = (x, y) => {
        return this.grid[x][y];
    };

    // should be able to place ships
    placeShip = (ship, start, finish) => {
        // figure out which coordinates we need to go through
        // check which of the coordinates there is a difference
        // it's either on the x-axis or the y-axis
        let numCoordinates;
        const coordinates = [];
        if (start[0] != finish[0]) {
            numCoordinates = Math.abs(finish[0] - start[0]) + 1;
            for (let i = 0; i < numCoordinates; i++) {
                coordinates.push([start[0] + i, start[1]]);
            };
        } else if (start[1] != finish[1]) {
            numCoordinates = Math.abs(finish[1] - start[1]) + 1;
            for (let i = 0; i < numCoordinates; i++) {
                coordinates.push([start[0], start[1] + i]);
            };
        // otherwise it's just one coordinate
        } else {
            numCoordinates = 1;
            coordinates.push([start[0], start[1]]);
        }

        // place the ship in the coordinates
        for (const coordinate of coordinates) {
            console.log("placing at: ", coordinate);
            this.grid[coordinate[0]][coordinate[1]] = ship;
        }

        // check if there are any ships in the coordinates
        // [b, 5] to [b, 8] 
        //this.grid[]


    }

    // should be able to receive an attack

    // should keep track of missed attacks to display them properly

    // should be able to report whether all or not all ships have been sunk
}