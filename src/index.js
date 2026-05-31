import "./style.css";
import Player from "./Player.js";
import Ship from "./Ship.js";
import { renderBoard, renderStartButton } from "./render.js";
import { initEvents } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
    initEvents();
});