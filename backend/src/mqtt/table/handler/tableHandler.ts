import {Table} from "../../../models/table.ts";
import {GameHandler} from "../../game/handler/gameHandler";
import {TableEventType} from "../events/tableEventType.ts";
import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import {HardwareHandler} from "../../hardware/handler/hardwareHandler";
import {TeamColor} from "../../../models/team";
import {TableEventMapper} from "../events/tableEventMapper.ts";

export class TableHandler extends DkModelHandler<
  TableEventType,
  Table
> {
  private readonly _gameHandler: GameHandler;
  private readonly _hardwareHandlerWhite: HardwareHandler;
  private readonly _hardwareHandlerBlack: HardwareHandler;

  constructor(soccerTable: Table) {
    super(soccerTable, HandlerType.SOCCERTABLE, soccerTable);
    this._hardwareHandlerWhite = new HardwareHandler(this, TeamColor.WHITE);
    this._hardwareHandlerBlack = new HardwareHandler(this, TeamColor.BLACK);
    this._gameHandler = new GameHandler(this.subject);
    this._mapper = new TableEventMapper(soccerTable, this._gameHandler);

    this.triggerEvent(TableEventType.NEW_GAME);
  }

  get gameHandler() {
    return this._gameHandler;
  }
}
