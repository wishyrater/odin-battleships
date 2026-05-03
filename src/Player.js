import Gameboard from "./Gameboard";

export default class Player {
    constructor(type) {
        if (type !== "human" && type !== "computer") {
            throw new Error("Player type must be one of 'human' or 'computer'")
        }
        this.type = type;
        this.gameboard = new Gameboard();
    }
}