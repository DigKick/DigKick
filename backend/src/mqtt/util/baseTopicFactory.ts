import {SoccerTable} from "../../models/soccerTable";
import {BasicTerm} from "./basicTerm";
import {TeamColor} from "../../models/team";

export class BaseTopicFactory {

  static getBaseTopic(soccerTable: SoccerTable): string {
    return `/${BasicTerm.TABLE}/${soccerTable.id}`;
  }

  static getTeamTopic(soccerTable: SoccerTable, teamColor: TeamColor): string {
    return this.getBaseTopic(soccerTable) + `/${BasicTerm.GAME}/${BasicTerm.TEAM}/${teamColor}`;
  }

  static getLedUpdateTopic(soccerTable: SoccerTable, teamColor: TeamColor): string {
    return this.getTeamTopic(soccerTable, teamColor) + `/leds`
  }
}