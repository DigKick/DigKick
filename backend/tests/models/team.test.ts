import { beforeEach, expect, test } from 'bun:test';
import { Team, TeamColor } from '../../src/models/team.ts';
import { playerOne, playerThree, playerTwo } from './player.test.ts';

let teamObj = new Team(TeamColor.WHITE);

beforeEach(() => {
  teamObj = new Team(TeamColor.WHITE);
});

test('add player to a team', () => {
  teamObj.addPlayer(playerOne);

  expect(teamObj.playerOne).not.toBeUndefined();
});

test('add two players to a team', () => {
  teamObj.addPlayer(playerOne);
  teamObj.addPlayer(playerTwo);

  expect(teamObj.playerOne).not.toBeUndefined();
  expect(teamObj.playerTwo).not.toBeUndefined();
});

test('add two players to a team', () => {
  teamObj.addPlayer(playerOne);
  teamObj.addPlayer(playerTwo);

  expect(teamObj.playerOne).toEqual(playerTwo);
  expect(teamObj.playerTwo).toEqual(playerOne);
});

test('add three players to white team', () => {
  teamObj.addPlayer(playerOne);
  teamObj.addPlayer(playerTwo);
  teamObj.addPlayer(playerThree);

  expect(teamObj.playerOne).toEqual(playerThree);
  expect(teamObj.playerTwo).toEqual(playerTwo);
});

test('add players two times to a team', () => {
  teamObj.addPlayer(playerOne);
  teamObj.addPlayer(playerOne);

  expect(teamObj.playerOne).toEqual(playerOne);
  expect(teamObj.playerTwo).toBeUndefined();
});

test('add players two times to a team', () => {
  teamObj.addPlayer(playerOne);
  teamObj.addPlayer(playerTwo);
  teamObj.addPlayer(playerOne);

  expect(teamObj.playerOne).toEqual(playerTwo);
  expect(teamObj.playerTwo).toEqual(playerOne);
});
