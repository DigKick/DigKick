import {expect, test} from "bun:test";
import {createValidBlackTeamEntity, createValidWhiteTeamEntity} from "../team/teamParser.test.ts";
import {GameEntity} from "../../../../src/database/modules/game/gameEntity.ts";
import {GameMode} from "../../../../src/models/gameMode.ts";
import {Game} from "../../../../src/models/game.ts";
import {GameParser} from "../../../../src/database/modules/game/gameParser.ts";


function createValidGameEntity() {
  const validGameEntity: GameEntity = new GameEntity()

  validGameEntity.gameMode = GameMode.DEFAULT.toString()

  validGameEntity.teamWhite = createValidWhiteTeamEntity();
  validGameEntity.teamBlack = createValidBlackTeamEntity();

  validGameEntity.pointsToWin = Game.STANDARDGAME_WINNINGSCORE;

  return validGameEntity
}

function createInvalidGameEntity() {
  const invalidGameEntity: GameEntity = createValidGameEntity()
  invalidGameEntity.gameMode = "thisIsNotAValidGameMode"

  return invalidGameEntity
}

export function createValidGame() {
  return new Game();
}

// GameEntity to Game
test('valid parse GameEntity to Game: gameMode field', () => {
  const parsedGame = GameParser.toGame(createValidGameEntity())

  expect(parsedGame.gameMode).not.toBeUndefined()
})

test('valid parse GameEntity to Game: teamWhite field', () => {
  const parsedGame = GameParser.toGame(createValidGameEntity())

  expect(parsedGame.teamWhite).not.toBeUndefined()
})

test('valid parse GameEntity to Game: teamBlack field', () => {
  const parsedGame = GameParser.toGame(createValidGameEntity())

  expect(parsedGame.teamBlack).not.toBeUndefined()
})

test('valid parse GameEntity to Game: pointsToWin field', () => {
  const parsedGame = GameParser.toGame(createValidGameEntity())

  expect(parsedGame.pointsToWin).not.toBeUndefined()
})

test('invalid parse GameEntity to Game: gameMode field', () => {
  expect(() => GameParser.toGame(createInvalidGameEntity())).toThrowError()
})


// Game to GameEntity
test('valid parse Game to GameEntity: teamWhite field', async () => {
  const parsedGameEntity = await GameParser.toGameEntity(createValidGame())

  expect(parsedGameEntity.teamWhite).not.toBeUndefined()
})

test('valid parse Game to GameEntity: teamBlack field', async () => {
  const parsedGameEntity = await GameParser.toGameEntity(createValidGame())

  expect(parsedGameEntity.teamBlack).not.toBeUndefined()
})

test('valid parse Game to GameEntity: pointsToWin field', async () => {
  const parsedGameEntity = await GameParser.toGameEntity(createValidGame())

  expect(parsedGameEntity.pointsToWin).not.toBeUndefined()
})

test('valid parse Game to GameEntity: gameMode field', async () => {
  const parsedGameEntity = await GameParser.toGameEntity(createValidGame())

  expect(parsedGameEntity.gameMode).not.toBeUndefined()
})