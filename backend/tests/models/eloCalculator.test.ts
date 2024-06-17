import {Team, TeamColor} from "../../src/models/team.ts";
import {beforeEach, expect, test} from "bun:test";
import {Player} from "../../src/models/player.ts";
import {EloCalculator} from "../../src/models/eloCalculator.ts";


let teamOne!: Team
let teamTwo!: Team

beforeEach(() => {
  teamOne = new Team(TeamColor.WHITE)

  const playerOne = new Player("playerOne", "playerOne", 100)
  const playerTwo = new Player("playerTwo", "playerTwo", 100)

  teamOne.addPlayer(playerOne)
  teamOne.addPlayer(playerTwo)

  teamTwo = new Team(TeamColor.BLACK)
  const playerThree = new Player("playerThree", "playerThree", 100)
  const playerFour = new Player("playerFour", "playerFour", 100)

  teamTwo.addPlayer(playerThree)
  teamTwo.addPlayer(playerFour)
})


test('basic elo calculation (from 1500 / 1900)', () => {
  const teamOneEloDiff = EloCalculator.getEloDifference(teamOne, teamTwo, true)

  expect(teamOneEloDiff).toBe(29)

})