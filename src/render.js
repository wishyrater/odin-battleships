export const renderBoard = (gameboard, parentElement) => {
    parentElement.innerHTML = '';
    const element = document.createElement("div");
    element.classList.add("gameboard");

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            // create a cell
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            if (gameboard.getCell(x, y) !== null) cell.classList.add("ship");
            element.appendChild(cell);
        }
    }
    parentElement.appendChild(element);
};