import {expect, test} from "bun:test";
import {Team, TeamColor} from "../../../../src/models/team.ts";
import {TeamEntity} from "../../../../src/database/modules/team/teamEntity.ts";
import {TeamParser} from "../../../../src/database/modules/team/teamParser.ts";

export function createValidWhiteTeamEntity() {
  return createValidTeamEntity(TeamColor.WHITE)
}

export function createValidBlackTeamEntity() {
  return createValidTeamEntity(TeamColor.BLACK)
}

function createValidTeamEntity(teamColor: TeamColor) {
  const validTeamEntity: TeamEntity = new TeamEntity();

  validTeamEntity.score = 5;
  validTeamEntity.color = teamColor;
  validTeamEntity.isWinner = false;

  return validTeamEntity
}

export function createValidWhiteTeam() {
  return createValidTeam(TeamColor.WHITE)
}

export function createValidBlackTeam() {
  return createValidTeam(TeamColor.BLACK)
}

function createValidTeam(teamColor: TeamColor) {
  const team = new Team(teamColor)
  team.score = 3;
  team.isWinner = false;

  return team
}

// TeamEntity to Table
test('valid parse TeamEntity to Team: color field', () => {
  const parsedTeam = TeamParser.toTeam(createValidWhiteTeamEntity())

  expect(parsedTeam.color).not.toBeUndefined();
})

test('valid parse TeamEntity to Team: score field', () => {
  const parsedTeam = TeamParser.toTeam(createValidWhiteTeamEntity())

  expect(parsedTeam.score).not.toBeUndefined();
})

test('valid parse TeamEntity to Team: isWinner field', () => {
  const parsedTeam = TeamParser.toTeam(createValidWhiteTeamEntity())

  expect(parsedTeam.isWinner).not.toBeUndefined();
})

test('invalid parse TeamEntity to Team: color field', () => {
  const teamEntity: TeamEntity = createValidWhiteTeamEntity();
  teamEntity.color = "notAValidTeamColor"

  expect(() => TeamParser.toTeam(teamEntity)).toThrowError()
})


// Table to TableEntity
test('valid parse Team to TeamEntity: color field', async () => {
  const parsedTeamEntity = await TeamParser.toTeamEntity(createValidWhiteTeam())

  expect(parsedTeamEntity.color).not.toBeUndefined();
})

test('valid parse Team to TeamEntity: score field', async () => {
  const parsedTeamEntity = await TeamParser.toTeamEntity(createValidWhiteTeam())

  expect(parsedTeamEntity.score).not.toBeUndefined();
})

test('valid parse Team to TeamEntity: color field', async () => {
  const parsedTeamEntity = await TeamParser.toTeamEntity(createValidWhiteTeam())

  expect(parsedTeamEntity.color).not.toBeUndefined();
})
