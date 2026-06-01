export const renderBoard = (gameboard, parentElement) => {
    parentElement.innerHTML = '';
    const element = document.createElement("div");
    element.classList.add("gameboard");

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            // create a cell
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            if (gameboard.getCell(x, y) !== null) cell.classList.add("ship");
            if (gameboard.attacks.some(([ax, ay]) => ax == x && ay == y)) cell.classList.add("attacked");
            element.appendChild(cell);
        }
    }
    parentElement.appendChild(element);
};

export const renderStartButton = (parentElement) => {
    const button = document.createElement("button");
    button.textContent = "Start game";
    button.classList.add("start-button");
    parentElement.appendChild(button);
};

const narratorTextContainer = document.querySelector(".narrator-text-container");

export const updateNarratorText = (message) => {
    if (!narratorTextContainer) {
        return;
    }
    narratorTextContainer.textContent = message;
};