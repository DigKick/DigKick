import {beforeEach, expect, test} from "bun:test";
import {Game} from "../../models/game";
import {ScoreChange} from "../../models/team";


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

  expect(gameObj.guestTeam.score).toEqual(1);
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


test('winning team does not change', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.homeTeam.updateScore(ScoreChange.INCREASE);
  }

  for (let i = 0; i < 10; i++) {
    gameObj.guestTeam.updateScore(ScoreChange.INCREASE);
  }

  expect(gameObj.winnerTeam).toEqual(gameObj.homeTeam)
})

test('winning team is reset after last goal got undo', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.homeTeam.updateScore(ScoreChange.INCREASE);
  }

  gameObj.homeTeam.updateScore(ScoreChange.DECREASE)


  expect(gameObj.winnerTeam).toBeUndefined()
})

test('winning team is reset after last goal got undo', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.homeTeam.updateScore(ScoreChange.INCREASE);
  }

  gameObj.homeTeam.updateScore(ScoreChange.DECREASE)

  expect(gameObj.winnerTeam).toBeUndefined()
})

test('undo winning team and other team wins', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.homeTeam.updateScore(ScoreChange.INCREASE);
  }

  for (let i = 0; i < 9; i++) {
    gameObj.guestTeam.updateScore(ScoreChange.INCREASE);
  }

  gameObj.homeTeam.updateScore(ScoreChange.DECREASE)
  gameObj.guestTeam.updateScore(ScoreChange.INCREASE)

  expect(gameObj.winnerTeam).toEqual(gameObj.guestTeam)
})