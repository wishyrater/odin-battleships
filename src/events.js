import Player from "./Player.js";
import { renderBoard, renderStartButton } from "./render.js";
import Ship from "./Ship.js";

// initial events on bootup
export const initEvents = () => {
    // generate players and populate their gameboards
    const player = new Player("human");
    const computer = new Player("computer");

    player.gameboard.populateRandomShips();
    computer.gameboard.populateRandomShips();

    // render gameboards
    const playerContainer = document.querySelector(".player-container");
    const computerContainer = document.querySelector(".computer-container");
    renderBoard(player.gameboard, playerContainer);
    renderBoard(computer.gameboard, computerContainer);

    // render startbutton
    const narratorContainer = document.querySelector(".narrator-container");
    renderStartButton(narratorContainer);

    // set ship movement phase event listeners
    let selectedShip = null;
    let verticalOrientation = null;
    let lastHoveredCell = null;

    const handlePlacementMouseDown = (e) => {
        e.preventDefault();
        const cell = e.target.closest(".cell");
        if (!cell) return;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        selectedShip = player.gameboard.getCell(x, y);
        if (selectedShip) verticalOrientation = selectedShip.isVertical;

        // TODO: implement right click to change vertical orientation
        document.addEventListener("keydown", handleRotate);
        playerContainer.addEventListener("mouseover", handlePreviewHover);
        document.addEventListener("mouseup", handlePlacementMouseUp)
    };

    const handleRotate = (e) => {
        if (e.key !== "r") return;
        if (!selectedShip || verticalOrientation === null) return;

        verticalOrientation = !verticalOrientation;

        if (lastHoveredCell) handlePreviewHover({target: lastHoveredCell});
    };

    const handlePlacementMouseUp = (e) => {
        clearPreviewCells();
        document.removeEventListener("keydown", handleRotate);
        playerContainer.removeEventListener("mouseover", handlePreviewHover);
        document.removeEventListener("mouseup", handlePlacementMouseUp);
        
        const cell = e.target.closest(".cell");
        if (!cell) return;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        if (!selectedShip) return;
        
        const end = verticalOrientation
            ? [x, y + selectedShip.size - 1]
            : [x + selectedShip.size - 1, y];
        
        try {
            player.gameboard.placeShip(selectedShip, [x, y], end);
            selectedShip.isVertical = verticalOrientation;
            renderBoard(player.gameboard, playerContainer);
        } catch (error) {
            // TODO: update narrator
        }
        selectedShip = null;
    };

    const handlePreviewHover = (e) => {
        if (!selectedShip) return;
        const cell = e.target.closest(".cell");
        if (!cell) return;
        lastHoveredCell = cell;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        clearPreviewCells();

        for (let i = 0; i < selectedShip.size; i++) {
            const cellToPaint = verticalOrientation
                ? document.querySelector(`[data-x="${x}"][data-y="${y+i}"]`)
                : document.querySelector(`[data-x="${x+i}"][data-y="${y}"]`);
            if (cellToPaint) cellToPaint.classList.add("newShipPreview");
        }
    };

    const initPlacementPhase = () => {
        playerContainer.addEventListener("mousedown", handlePlacementMouseDown);
    };

    const clearPreviewCells = () => {
        document.querySelectorAll(".newShipPreview")
            .forEach(c => c.classList.remove("newShipPreview"));
    };

    const initStartButton = () => {
        const startButton = document.querySelector(".start-button");
        startButton.addEventListener("click", () => {
            startButton.remove();
            playerContainer.removeEventListener("contextmenu", handleRotate);
            playerContainer.removeEventListener("mousedown", handlePlacementMouseDown);
            playerContainer.removeEventListener("mouseover", handlePreviewHover);
            document.removeEventListener("mouseup", handlePlacementMouseUp);
            initBattlePhase();
        });
    };

    const initBattlePhase = () => {
        computerContainer.addEventListener("click", handlePlayerAttack);
    };

    const handlePlayerAttack = (e) => {
        const cell = e.target.closest(".cell");
        if (!cell) return;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        // if they've already attacked, just ignore it
        if (computer.gameboard.attacks.some(([ax, ay]) => ax === x && ay === y)) return;

        computer.gameboard.receiveAttack(x, y);
        renderBoard(computer.gameboard, computerContainer);

        // check for win condition
        if (computer.gameboard.allSunk()) {
            alert("You won");
            location.reload();
            return;
        }

        computerContainer.removeEventListener("click", handlePlayerAttack);
        handleComputerAttack();
    };

    const handleComputerAttack = () => {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (player.gameboard.attacks.some(([ax, ay]) => ax === x && ay === y));

        player.gameboard.receiveAttack(x, y);
        renderBoard(player.gameboard, playerContainer);

        if (player.gameboard.allSunk()) {
            alert("You lost");
            location.reload();
            return;
        }

        computerContainer.addEventListener("click", handlePlayerAttack);
    };

    initStartButton();
    initPlacementPhase();
};