import { Table } from '../../../models/table.ts';
import { TeamColor } from '../../../models/team.ts';
import { BaseTopicFactory } from '../../util/baseTopicFactory.ts';
import { BasicTerm } from '../../util/basicTerm.ts';
import * as path from 'node:path';

export class NfcReaderTopicManager {
  constructor(
    private _soccerTable: Table,
    private _teamColor: TeamColor,
  ) {}

  private get _baseTeamTopic(): string {
    return BaseTopicFactory.getTeamTopic(this._soccerTable, this._teamColor);
  }

  get nfcReaderTopic(): string {
    return path.join(this._baseTeamTopic, BasicTerm.NFC_READER);
  }
}
