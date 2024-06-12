import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import type {PlayerEventType} from "../events/playerEvent.ts";
import {Table} from "../../../models/table.ts";
import {PlayerEventMapper} from "../events/playerEventMapper.ts";

export class PlayerHandler extends DkModelHandler<PlayerEventType, Table> {

  public observerMap: Map<PlayerEventType, Function> = new Map();

  constructor(soccerTable: Table) {
    super(soccerTable, HandlerType.PLAYER, soccerTable);

    this._mapper = new PlayerEventMapper(soccerTable);

  }

}