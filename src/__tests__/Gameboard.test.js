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

test("can't place ship if a ship is already there", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0, 0], [0, 0]);
    const additionalShip = new Ship(1);
    expect(() => gameboard.placeShip(additionalShip, [0, 0], [0, 0])).toThrow(Error);
});

test("can't place ship out of bounds", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    expect(() => gameboard.placeShip(ship, [11, 11], [11, 11])).toThrow(Error);
});

test("attacks that hit ships register", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0, 0], [0, 0]);
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
});

test("attacks are registered", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.attacks).toContainEqual([0, 0]);
});

test("can't attack previously attacked cell", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(() => gameboard.receiveAttack(0, 0)).toThrow(Error);
});

test("registers when a ship is sunk", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0, 0], [0, 0]);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.getCell(0, 0).isSunk()).toBe(true);
});

test("can report when all ships are sunk", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0, 0], [0, 0]);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allSunk()).toBe(true);
});