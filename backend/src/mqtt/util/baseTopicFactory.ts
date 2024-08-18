import { Table } from '../../models/table.ts';
import { BasicTerm } from './basicTerm';
import { TeamColor } from '../../models/team';
import * as path from 'node:path';

export class BaseTopicFactory {
  static getBaseTopic(soccerTable: Table): string {
    return path.join(BasicTerm.TABLE, soccerTable.name);
  }

  static getTeamTopic(soccerTable: Table, teamColor: TeamColor): string {
    return path.join(
      this.getBaseTopic(soccerTable),
      BasicTerm.GAME,
      BasicTerm.TEAM,
      teamColor,
    );
  }

  static getLedUpdateTopic(soccerTable: Table, teamColor: TeamColor): string {
    return path.join(this.getTeamTopic(soccerTable, teamColor), 'leds');
  }
}
