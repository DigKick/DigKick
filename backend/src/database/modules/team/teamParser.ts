import { TeamEntity } from './teamEntity.ts';
import { Team, TeamColor } from '../../../models/team.ts';
import { DkParseException } from '../../dkParseException.ts';
import { PlayerEntity } from '../player/playerEntity.ts';

export class TeamParser {
  private static isValidTeamColor(input: string): boolean {
    return (Object.values(TeamColor) as string[]).includes(input);
  }

  public static toTeam(teamEntity: TeamEntity): Team {
    if (!this.isValidTeamColor(teamEntity.color)) {
      throw new DkParseException(
        TeamEntity.constructor.name,
        Team.constructor.name,
      );
    }

    try {
      const team = new Team(teamEntity.color as TeamColor);

      team.score = teamEntity.score;
      team.isWinner = teamEntity.isWinner;

      return team;
    } catch (e) {
      throw new DkParseException(
        TeamEntity.constructor.name,
        Team.constructor.name,
      );
    }
  }

  public static async toTeamEntity(team: Team): Promise<TeamEntity> {
    try {
      const teamEntity = new TeamEntity();

      teamEntity.color = team.color;
      teamEntity.isWinner = team.isWinner;
      teamEntity.score = team.score;

      if (team.playerOne) {
        const maybePlayerOne = await PlayerEntity.findOneBy({
          hashSerialNumber: team.playerOne.key,
        });

        if (maybePlayerOne != null) {
          teamEntity.playerOne = maybePlayerOne;
        }
      }

      if (team.playerTwo) {
        const maybePlayerTwo = await PlayerEntity.findOneBy({
          hashSerialNumber: team.playerTwo.key,
        });

        if (maybePlayerTwo != null) {
          teamEntity.playerTwo = maybePlayerTwo;
        }
      }

      return teamEntity;
    } catch (e) {
      throw new DkParseException(
        Team.constructor.name,
        TeamEntity.constructor.name,
      );
    }
  }

  private static async getPlayerByHashedSerialNumber(
    hashedSerialNumber: string,
  ) {
    return await PlayerEntity.findOneBy({
      hashSerialNumber: hashedSerialNumber,
    });
  }
}
