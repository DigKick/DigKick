import {Table} from "../../../models/table.ts";
import {TeamColor} from "../../../models/team.ts";
import {BaseTopicFactory} from "../../util/baseTopicFactory.ts";

export class PlayerTopicManager {

  constructor(
    private _soccerTable: Table,
    private _teamColor: TeamColor,
  ) {
  }

  nfcReaderTopic() {
    return BaseTopicFactory.getTeamTopic(this._soccerTable, this._teamColor) + "/changename";
  }

}