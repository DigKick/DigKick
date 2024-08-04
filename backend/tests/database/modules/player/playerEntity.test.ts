import { beforeEach, expect, test } from 'bun:test';
import { createNewTestDatabase } from '../testDatabaseSetup.ts';
import { PlayerRepository } from '../../../../src/database/modules/player/playerRepository.ts';
import { createValidPlayer } from './playerParser.test.ts';
import { PlayerEntity } from '../../../../src/database/modules/player/playerEntity.ts';
import { SerialNumberHasher } from '../../../../src/database/modules/player/serialNumberHasher.ts';

beforeEach(async () => {
  await createNewTestDatabase();
});

test('save new player to database', async () => {
  await PlayerRepository.getOrCreatePlayer(createValidPlayer().key);

  const playerEntities = await PlayerEntity.find();

  expect(playerEntities.length).toBe(1);
});

test('get player by serial number', async () => {
  await PlayerRepository.getOrCreatePlayer(createValidPlayer().key);

  const playerBySerialNum = await PlayerRepository.findPlayerByUnhashedKey(
    createValidPlayer().key,
  );

  expect(playerBySerialNum).not.toBeUndefined();
});

test('hash validator', async () => {
  const serialNumber = 'mySerialNumber';
  const hashedStr = await SerialNumberHasher.hashSerialNumber(serialNumber);

  const isMatch = await SerialNumberHasher.hashValidator(
    hashedStr,
    serialNumber,
  );

  expect(isMatch).toBeTrue();
});
