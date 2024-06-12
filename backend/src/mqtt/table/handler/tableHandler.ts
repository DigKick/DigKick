import {Table} from "../../../models/table.ts";
import {GameHandler} from "../../game/handler/gameHandler";
import {TableEventType} from "../events/tableEventType.ts";
import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import {SensorHandler} from "../../hardware/handler/sensorHandler.ts";
import {TeamColor} from "../../../models/team";
import {TableEventMapper} from "../events/tableEventMapper.ts";

export class TableHandler extends DkModelHandler<
  TableEventType,
  Table
> {
  private readonly _gameHandler: GameHandler;
  private readonly _hardwareHandlerWhite: SensorHandler;
  private readonly _hardwareHandlerBlack: SensorHandler;

  constructor(soccerTable: Table) {
    super(soccerTable, HandlerType.SOCCERTABLE, soccerTable);
    this._hardwareHandlerWhite = new SensorHandler(this, TeamColor.WHITE);
    this._hardwareHandlerBlack = new SensorHandler(this, TeamColor.BLACK);
    this._gameHandler = new GameHandler(this.subject);
    this._mapper = new TableEventMapper(soccerTable, this._gameHandler);

    this.triggerEvent(TableEventType.NEW_GAME);
  }

  get gameHandler() {
    return this._gameHandler;
  }
}
