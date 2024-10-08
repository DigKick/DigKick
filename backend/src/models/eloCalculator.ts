import type { Team } from './team.ts';
import { LoggerFactory } from '../logging/loggerFactory.ts';

export class EloCalculator {
  public static K_FACTOR = 32;

  private static _logger = LoggerFactory.getLogger(EloCalculator.name);

  public static getEloDifference(teamOne: Team, teamTwo: Team) {
    if (!teamOne.playerOne || !teamOne.playerTwo) {
      this._logger.error(
        'Team one does not have enough players to calculate a new elo score.',
      );
      return 0;
    }

    if (!teamTwo.playerOne || !teamTwo.playerTwo) {
      this._logger.error(
        'Team two does not have enough players to calculate a new elo score.',
      );
      return 0;
    }

    if (
      (teamOne.isWinner && teamTwo.isWinner) ||
      (!teamOne.isWinner && !teamTwo.isWinner)
    ) {
      this._logger.error(
        'Exactly one team needs to be the winner to calculate a new elo score.',
      );
      return 0;
    }

    const teamOneAvgElo = Math.floor(
      (teamOne.playerOne.elo + teamOne.playerTwo.elo) / 2,
    );
    const teamTwoAvgElo = Math.floor(
      (teamTwo.playerOne.elo + teamTwo.playerTwo.elo) / 2,
    );

    const expectedTeamOneWin =
      1 / (1 + Math.pow(10, (teamTwoAvgElo - teamOneAvgElo) / 400));
    const score = teamOne.isWinner ? 1 : 0;

    return Math.floor((score - expectedTeamOneWin) * EloCalculator.K_FACTOR);
  }
}
