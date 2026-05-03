import Player from "../Player";

test("can create real player", () => {
    const player = new Player("human");
    expect(player.type).toBe("human");
});

test("can create computer player", () => {
    const player = new Player("computer");
    expect(player.type).toBe("computer");
});

test("can't create invalid player type", () => {
    expect(() => new Player("cat")).toThrow(Error);
});

test("new player contains gameboard", () => {
    const player = new Player("human");
    expect(player.gameboard).not.toBeNull();
});