export default class Ship {
    constructor(size, isVertical = false) {
        this.size = size;
        this.hits = 0;
        this.isVertical = isVertical;
    }

    hit = () => {
        this.hits++;
    };

    isSunk = () => {
        return this.size === this.hits;
    };
};