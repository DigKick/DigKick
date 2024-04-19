import {beforeEach, expect, test} from "bun:test";
import {Game} from "../../models/game";
import {ScoreChange, Team} from "../../models/team";


let gameObj = new Game('gameId');


beforeEach(() => {
    gameObj = new Game('gameId');
})


/*
    Tests for basic game
 */

test('home team scores once', () => {
    gameObj.homeTeam.updateScore(ScoreChange.INCREASE);

    expect(gameObj.homeTeam.score).toBe(1);
});

test('guest team scores once', () => {
    gameObj.guestTeam.updateScore(ScoreChange.INCREASE);

    expect(gameObj.guestTeam.score).toBe(1);
});

test('decrease of a score', () => {
    gameObj.homeTeam.updateScore(ScoreChange.INCREASE);
    gameObj.homeTeam.updateScore(ScoreChange.INCREASE);

    gameObj.homeTeam.updateScore(ScoreChange.DECREASE);

    expect(gameObj.homeTeam.score).toEqual(1)
})


test('white team wins', () => {
    for (let i = 0; i < 10; i++) {
        gameObj.homeTeam.updateScore(ScoreChange.INCREASE);
    }

    expect(gameObj.winnerTeam).toEqual(gameObj.homeTeam)
})
