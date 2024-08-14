import { Table } from '../../models/table.ts';
import { BasicTerm } from './basicTerm';
import { TeamColor } from '../../models/team';

export class BaseTopicFactory {
  static getBaseTopic(soccerTable: Table): string {
    return `/${BasicTerm.TABLE}/${soccerTable.name}`;
  }

  static getTeamTopic(soccerTable: Table, teamColor: TeamColor): string {
    return (
      this.getBaseTopic(soccerTable) +
      `/${BasicTerm.GAME}/${BasicTerm.TEAM}/${teamColor}`
    );
  }

  static getLedUpdateTopic(soccerTable: Table, teamColor: TeamColor): string {
    return this.getTeamTopic(soccerTable, teamColor) + `/leds`;
  }
}
