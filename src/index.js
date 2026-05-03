import "./style.css";
import Player from "./Player.js";
import Ship from "./Ship.js";
import { renderBoard } from "./render.js";

document.addEventListener("DOMContentLoaded", (e) => {
    const player = new Player("human");
    player.gameboard.placeShip(new Ship(2), [0, 0], [0, 1]);
    const computer = new Player("computer");

    const playerContainer = document.querySelector(".player-container");
    const computerContainer = document.querySelector(".computer-container");

    renderBoard(player.gameboard, playerContainer);
    renderBoard(computer.gameboard, computerContainer);
});