import { beforeEach, expect, test } from 'bun:test';
import { Game } from '../../src/models/game.ts';
import { ScoreChange } from '../../src/models/team.ts';

let gameObj = new Game();

beforeEach(() => {
  gameObj = new Game();
});

/*
    Tests for basic game
 */

test('white team scores once', () => {
  gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);

  expect(gameObj.teamWhite.score).toBe(1);
});

test('team score can not be negative', () => {
  gameObj.updateWhiteTeamScore(ScoreChange.DECREASE);

  expect(gameObj.teamWhite.score).toBe(0);
});

test('black team scores once', () => {
  gameObj.updateBlackTeamScore(ScoreChange.INCREASE);

  expect(gameObj.teamBlack.score).toEqual(1);
});

test('decrease of a score', () => {
  gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);

  gameObj.updateWhiteTeamScore(ScoreChange.DECREASE);

  expect(gameObj.teamWhite.score).toEqual(1);
});

test('white team wins', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  expect(gameObj.teamWinner).toEqual(gameObj.teamWhite);
});

test('winning team does not change', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  for (let i = 0; i < 10; i++) {
    gameObj.updateBlackTeamScore(ScoreChange.INCREASE);
  }

  expect(gameObj.teamWinner).toEqual(gameObj.teamWhite);
});

test('winning team is reset after last goal got undo', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  gameObj.updateWhiteTeamScore(ScoreChange.DECREASE);

  expect(gameObj.teamWinner).toBeUndefined();
});

test('undo winning team and other team wins', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  for (let i = 0; i < 9; i++) {
    gameObj.updateBlackTeamScore(ScoreChange.INCREASE);
  }

  gameObj.updateWhiteTeamScore(ScoreChange.DECREASE);
  gameObj.updateBlackTeamScore(ScoreChange.INCREASE);

  expect(gameObj.teamWinner).toEqual(gameObj.teamBlack);
});

test('reset game', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  for (let i = 0; i < 4; i++) {
    gameObj.updateBlackTeamScore(ScoreChange.INCREASE);
  }

  gameObj.reset();

  expect(gameObj.teamWinner).toBeUndefined();
  expect(gameObj.teamWhite.score).toBe(0);
  expect(gameObj.teamBlack.score).toBe(0);
});
