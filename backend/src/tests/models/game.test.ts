import { expect, test, beforeEach, mock } from "bun:test";
import {Game} from "../../models/game";
import {Team} from "../../models/team";



let gameObj = new Game('gameId');
let mockFunction = mock()

beforeEach(() => {
    gameObj = new Game('gameId');
    mockFunction = mock()
})


/*
    Tests for basic game
 */

test('white team scores once', () => {
    gameObj.teamScores(Team.WHITE);

    expect(gameObj.getTeamScore(Team.WHITE)).toBe(1);
});

test('black team scores once', () => {
    gameObj.teamScores(Team.BLACK);

    expect(gameObj.getTeamScore(Team.BLACK)).toBe(1);
});

test('white team wins', () => {
    for (let i = 0; i < 10; i++) {
        gameObj.teamScores(Team.WHITE);
    }

    expect(gameObj.winner).toEqual(Team.WHITE)
})

test('white team wins with 10 points', () => {
    for (let i = 0; i < 10; i++) {
        gameObj.teamScores(Team.WHITE);
    }

    expect(gameObj.getTeamScore(Team.WHITE)).toEqual(Game.STANDARDGAME_WINNINGSCORE)
    expect(gameObj.winner).toEqual(Team.WHITE)
})


test('winner does not change', () => {
    for (let i = 0; i < 10; i++) {
        gameObj.teamScores(Team.WHITE);
    }

    const blackScoresTenTimes = () => {
        for (let i = 0; i <= 10; i++) {
            gameObj.teamScores(Team.BLACK);
        }
    }
    blackScoresTenTimes()

    expect(gameObj.winner).toBe(Team.WHITE)
})
