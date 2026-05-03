import "./style.css";
import Player from "./Player.js";
import { renderBoard } from "./render.js";

document.addEventListener("DOMContentLoaded", (e) => {
    const player = new Player("human");
    const computer = new Player("computer");

    const playerContainer = document.querySelector(".player-gameboard-container");
    const computerContainer = document.querySelector(".computer-gameboard-container");

    renderBoard(player.gameboard, playerContainer);
    renderBoard(computer.gameboard, computerContainer);
});