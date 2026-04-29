export default class Ship {
    constructor(size, hits = 0, sunken = false) {
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