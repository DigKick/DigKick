import {beforeEach, expect, test} from "bun:test";
import {createNewTestDatabase} from "../testDatabaseSetup.ts";
import {GameEntity} from "../../../../src/database/modules/game/gameEntity.ts";
import {createValidGame} from "./gameParser.test.ts";
import {GameRepository} from "../../../../src/database/modules/game/gameRepository.ts";
import {createSecondValidTable, createValidTable} from "../table/tableParser.test.ts";
import {TableRepository} from "../../../../src/database/modules/table/tableRepository.ts";

beforeEach(async () => {
  await createNewTestDatabase()

  await TableRepository.saveTable(createValidTable())
  await TableRepository.saveTable(createSecondValidTable())
})

test('save game to database', async () => {
  await GameRepository.saveGame(createValidGame(), createValidTable())

  const gameFromDb = GameEntity.findOneBy({id: 1})

  expect(gameFromDb).not.toBeUndefined()
})

test('save multiple games on same table to database', async () => {
  await GameRepository.saveGame(createValidGame(), createValidTable())
  await GameRepository.saveGame(createValidGame(), createValidTable())

  const gamesInDb = await GameEntity.find()

  expect(gamesInDb.length).toBe(2)
})

test('save multiple games on different to database: creation', async () => {
  await GameRepository.saveGame(createValidGame(), createValidTable())
  await GameRepository.saveGame(createValidGame(), createSecondValidTable())

  const gamesInDb = await GameEntity.find()

  expect(gamesInDb.length).toBe(2)
})

test('save multiple games on different to database: table names', async () => {
  await GameRepository.saveGame(createValidGame(), createValidTable())
  await GameRepository.saveGame(createValidGame(), createSecondValidTable())

  const gamesInDb = await GameEntity.find()
  expect(gamesInDb[0].table.name).toBe(createValidTable().name)
  expect(gamesInDb[1].table.name).toBe(createSecondValidTable().name)
})