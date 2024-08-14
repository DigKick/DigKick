import { expect, test } from 'bun:test';
import { ApplicationProperties } from '../../../src/util/properties/applicationProperties.ts';
import { PlayerEditHandler } from '../../../src/mqtt/player/handler/playerEditHandler.ts';

test('player name length validator', () => {
  let tooLongPlayerName = 'a'.repeat(
    ApplicationProperties.get().player.name.restrictions.length.max + 1,
  );
  let tooShortPlayerName = 'a'.repeat(
    ApplicationProperties.get().player.name.restrictions.length.min - 1,
  );
  let validPlayerName1 = 'a'.repeat(
    ApplicationProperties.get().player.name.restrictions.length.max,
  );
  let validPlayerName2 = 'a'.repeat(
    ApplicationProperties.get().player.name.restrictions.length.min,
  );

  expect(
    PlayerEditHandler.isPlayerNameLengthValid(tooLongPlayerName),
  ).toBeFalse();
  expect(
    PlayerEditHandler.isPlayerNameLengthValid(tooShortPlayerName),
  ).toBeFalse();
  expect(
    PlayerEditHandler.isPlayerNameLengthValid(validPlayerName1),
  ).toBeTrue();
  expect(
    PlayerEditHandler.isPlayerNameLengthValid(validPlayerName2),
  ).toBeTrue();
});
