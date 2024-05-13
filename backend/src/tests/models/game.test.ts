import {beforeEach, expect, test} from "bun:test";
import {Game} from "../../models/game";
import {ScoreChange} from "../../models/team";


let gameObj = new Game();


beforeEach(() => {
  gameObj = new Game();
})


/*
    Tests for basic game
 */

test('white team scores once', () => {
  gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);

  expect(gameObj.whiteTeam.score).toBe(1);
});

test('team score can not be negative', () => {
  gameObj.updateWhiteTeamScore(ScoreChange.DECREASE)

  expect(gameObj.whiteTeam.score).toBe(0)
})

test('black team scores once', () => {
  gameObj.updateBlackTeamScore(ScoreChange.INCREASE);

  expect(gameObj.blackTeam.score).toEqual(1);
});

test('decrease of a score', () => {
  gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);

  gameObj.updateWhiteTeamScore(ScoreChange.DECREASE);

  expect(gameObj.whiteTeam.score).toEqual(1)
})

test('white team wins', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  expect(gameObj.winnerTeam).toEqual(gameObj.whiteTeam)
})


test('winning team does not change', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  for (let i = 0; i < 10; i++) {
    gameObj.updateBlackTeamScore(ScoreChange.INCREASE);
  }

  expect(gameObj.winnerTeam).toEqual(gameObj.whiteTeam)
})

test('winning team is reset after last goal got undo', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  gameObj.updateWhiteTeamScore(ScoreChange.DECREASE)


  expect(gameObj.winnerTeam).toBeUndefined()
})

test('undo winning team and other team wins', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  for (let i = 0; i < 9; i++) {
    gameObj.updateBlackTeamScore(ScoreChange.INCREASE);
  }

  gameObj.updateWhiteTeamScore(ScoreChange.DECREASE)
  gameObj.updateBlackTeamScore(ScoreChange.INCREASE)

  expect(gameObj.winnerTeam).toEqual(gameObj.blackTeam)
})

test('reset game', () => {
  for (let i = 0; i < 10; i++) {
    gameObj.updateWhiteTeamScore(ScoreChange.INCREASE);
  }

  for (let i = 0; i < 4; i++) {
    gameObj.updateBlackTeamScore(ScoreChange.INCREASE);
  }

  gameObj.reset()

  expect(gameObj.winnerTeam).toBeUndefined()
  expect(gameObj.whiteTeam.score).toBe(0)
  expect(gameObj.blackTeam.score).toBe(0)
})