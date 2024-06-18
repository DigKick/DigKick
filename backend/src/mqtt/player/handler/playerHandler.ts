import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import type {PlayerEventType} from "../events/playerEvent.ts";
import {Table} from "../../../models/table.ts";
import {PlayerEventMapper} from "../events/playerEventMapper.ts";
import type {TableHandler} from "../../table/handler/tableHandler.ts";

export class PlayerHandler extends DkModelHandler<PlayerEventType, Table> {

  public observerMap: Map<PlayerEventType, Function> = new Map();

  constructor(tableHandler: TableHandler, table: Table) {
    super(table, HandlerType.PLAYER, table);
    this._mapper = new PlayerEventMapper(tableHandler, table);
  }

}