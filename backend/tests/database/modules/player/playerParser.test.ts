import {PlayerEntity} from "../../../../src/database/modules/player/playerEntity.ts";
import {Player} from "../../../../src/models/player.ts";
import {expect, test} from "bun:test";
import {PlayerParser} from "../../../../src/database/modules/player/playerParser.ts";

export function createValidPlayerEntity() {
  const validPlayerEntity = new PlayerEntity()

  validPlayerEntity.name = 'validPlayerEntity'

  return validPlayerEntity
}

export function createValidPlayer() {
  return new Player("validPlayer", "key", 100);
}


test('valid parse PlayerEntity to Player: name field', () => {
  const parsedPlayer: Player = PlayerParser.toPlayer(createValidPlayerEntity());

  expect(parsedPlayer.name).not.toBeUndefined()
})

test('valid parse Player to PlayerEntity: name field', () => {
  const parsedPlayerEntity: PlayerEntity = PlayerParser.toPlayerEntity(createValidPlayer())

  expect(parsedPlayerEntity.name).not.toBeUndefined()
})