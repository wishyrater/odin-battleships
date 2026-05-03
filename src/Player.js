import Gameboard from "./Gameboard.js";

export default class Player {
    constructor(type) {
        if (type !== "human" && type !== "computer") {
            throw new Error("Player type must be one of 'human' or 'computer'")
        }
        this.type = type;
        this.gameboard = new Gameboard();
    }
}