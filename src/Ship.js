export default class Ship {
    constructor(x, y, size, hits = 0, sunken = false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hits = hits;
        this.sunken = sunken;
    }

    hit = () => {
        this.hits++;
    };

    isSunk = () => {
        return this.size === this.hits;
    };
};