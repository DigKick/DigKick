import { Team, TeamColor } from '../../src/models/team.ts';
import { beforeEach, expect, test } from 'bun:test';
import { Player } from '../../src/models/player.ts';
import { EloCalculator } from '../../src/models/eloCalculator.ts';

let teamOne: Team = new Team(TeamColor.WHITE);
let teamTwo: Team = new Team(TeamColor.BLACK);

beforeEach(() => {
  teamOne = new Team(TeamColor.WHITE);

  const playerOne = new Player('playerOne', 'playerOne', 100);
  const playerTwo = new Player('playerTwo', 'playerTwo', 100);

  teamOne.addPlayer(playerOne);
  teamOne.addPlayer(playerTwo);

  teamTwo = new Team(TeamColor.BLACK);
  const playerThree = new Player('playerThree', 'playerThree', 100);
  const playerFour = new Player('playerFour', 'playerFour', 100);

  teamTwo.addPlayer(playerThree);
  teamTwo.addPlayer(playerFour);
});

test('team one has an undefined player', () => {
  teamOne = new Team(TeamColor.WHITE);

  expect(EloCalculator.getEloDifference(teamOne, teamTwo)).toBe(0);

  teamOne.addPlayer(new Player('playerOne', 'playerOne', 100));

  expect(EloCalculator.getEloDifference(teamOne, teamTwo)).toBe(0);
});

test('team two has an undefined player', () => {
  teamTwo = new Team(TeamColor.WHITE);

  expect(EloCalculator.getEloDifference(teamOne, teamTwo)).toBe(0);

  teamTwo.addPlayer(new Player('playerOne', 'playerOne', 100));

  expect(EloCalculator.getEloDifference(teamOne, teamTwo)).toBe(0);
});

test('basic elo calculation (100 - 100)', () => {
  teamOne.isWinner = true;
  const teamOneEloDiff = EloCalculator.getEloDifference(teamOne, teamTwo);

  expect(teamOneEloDiff).toBe(16);
});

test('basic elo calculation (1500 - 1900)', () => {
  // @ts-ignore
  teamOne.playerOne!.elo = 1500;
  // @ts-ignore
  teamOne.playerTwo!.elo = 1500;

  teamOne.isWinner = true;

  // @ts-ignore
  teamTwo.playerOne!.elo = 1900;
  // @ts-ignore
  teamTwo.playerTwo!.elo = 1900;

  const teamOneEloDiff = EloCalculator.getEloDifference(teamOne, teamTwo);

  expect(teamOneEloDiff).toBe(29);
});
