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
        this.attacks = [];
        this.placedShips = [];
    };

    getCell = (x, y) => {
        return this.grid[y][x];
    };

    // should be able to place ships
    placeShip = (ship, [x1, y1], [x2, y2]) => {
        // figure out which coordinates we need to go through
        let numCoordinates;
        const coordinates = [];
        // check which of the coordinates there is a difference
        // it's either on the x-axis or the y-axis
        if (x1 != x2) {
            numCoordinates = Math.abs(x2 - x1) + 1;
            for (let i = 0; i < numCoordinates; i++) {
                coordinates.push([x1 + i, y1]);
            }
        } else if (y1 != y2) {
            numCoordinates = Math.abs(y2 - y1) + 1;
            for (let i = 0; i < numCoordinates; i++) {
                coordinates.push([x1, y1 + i]);
            }
        // otherwise it's just one coordinate
        } else {
            numCoordinates = 1;
            coordinates.push([x1, y1]);
        }

        // place the ship in the coordinates
        for (const [x, y] of coordinates) {
            if (x < 0 || y < 0 || x > 9 || y > 9) throw new Error("Out of bounds");
            if (this.grid[y][x] !== null) throw new Error("Can't place ship in occupied cell");
        }

        for (const [x, y] of coordinates) {
            this.grid[y][x] = ship;
        }

        this.placedShips.push(ship);
    };

    // should be able to receive an attack
    receiveAttack = (x, y) => {
        if (this.attacks.some(([ax, ay]) => ax === x && ay === y)) {
            throw new Error("Cell already attacked");
        }
        this.attacks.push([x, y]);
        if (this.grid[y][x] !== null) this.grid[y][x].hit();
    };

    // should be able to report whether all or not all ships have been sunk
    allSunk = () => this.placedShips.every(ship => ship.isSunk());
};