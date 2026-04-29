import Gameboard from "../Gameboard";
import Ship from "../Ship";

test("can place ship", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(4);
    gameboard.placeShip(ship, [1, 4], [1, 7]);
    expect(gameboard.getCell(1, 4)).toBe(ship);
    expect(gameboard.getCell(1, 5)).toBe(ship);
    expect(gameboard.getCell(1, 6)).toBe(ship);
    expect(gameboard.getCell(1, 7)).toBe(ship);
});

test("can't place ship if collision", () => {

});

test("can receive attack", () => {

});

test("can't attack previously attacked cell", () => {

});

test("stores missed attacks", () => {

});

test("registers when a ship is sunk", () => {

});

test("can report when all ships are sunk", () => {

});