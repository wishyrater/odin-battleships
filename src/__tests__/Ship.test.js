import Ship from "../Ship";

test("isSunk returns true", () => {
    expect(new Ship(null, null, 1, 1).isSunk()).toBe(true);
});

test("isSunk returns false", () => {
    expect(new Ship(null, null, 2, 1).isSunk()).toBe(false);
});

test("hit registers", () => {
    const ship = new Ship(null, null, 3);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test("multiple hits register", () => {
    const ship = new Ship(null, null, 3);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
})

test("ship sinks after enough hits", () => {
    const ship = new Ship(null, null, 2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});