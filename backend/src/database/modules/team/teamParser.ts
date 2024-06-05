import {TeamEntity} from "./teamEntity.ts";
import {Team, TeamColor} from "../../../models/team.ts";
import {DkParseException} from "../../DkParseException.ts";

export class TeamParser {

  private static isValidTeamColor(input: string): boolean {
    return (Object.values(TeamColor) as string[]).includes(input);
  }

  public static toTeam(teamEntity: TeamEntity): Team {
    if (!this.isValidTeamColor(teamEntity.color)) {
      throw new DkParseException(TeamEntity.constructor.name, Team.constructor.name)
    }

    try {
      const team = new Team(teamEntity.color as TeamColor);

      team.score = teamEntity.score;
      team.isWinner = teamEntity.isWinner;

      return team
    } catch (e) {
      throw new DkParseException(TeamEntity.constructor.name, Team.constructor.name)
    }
  }

  public static toTeamEntity(team: Team): TeamEntity {
    try {
      const teamEntity = new TeamEntity();

      teamEntity.color = team.color;
      teamEntity.isWinner = team.isWinner;
      teamEntity.score = team.score;

      return teamEntity
    } catch (e) {
      throw new DkParseException(Team.constructor.name, TeamEntity.constructor.name)
    }
  }

}