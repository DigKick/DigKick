import {Table} from "../../../models/table.ts";
import {GameHandler} from "../../game/handler/gameHandler";
import {SoccerTableEventType} from "../events/soccerTableEventType";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";
import {HardwareHandler} from "../../hardware/handler/hardwareHandler";
import {TeamColor} from "../../../models/team";
import {SoccerTableEventMapper} from "../events/soccerTableEventMapper";

export class SoccerTableHandler extends AbstractHandler<
  SoccerTableEventType,
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
    this._mapper = new SoccerTableEventMapper(soccerTable, this._gameHandler);

    this.triggerEvent(SoccerTableEventType.NEW_GAME);
  }

  get gameHandler() {
    return this._gameHandler;
  }
}
