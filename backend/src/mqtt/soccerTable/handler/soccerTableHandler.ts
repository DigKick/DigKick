import {SoccerTable} from "../../../models/soccerTable";
import {GameHandler} from "../../game/handler/gameHandler";
import {SoccerTableEvent, soccerTableEventMapper,} from "../events/soccerTableEvent";
import {AbstractHandler, HandlerType} from "../../abstract/abstractHandler";
import {HardwareHandler} from "../../hardware/handler/hardwareHandler";
import {HardwareTopicManager} from "../../hardware/topics/hardwareTopicManager";
import {TeamColor} from "../../../models/team";

export class SoccerTableHandler extends AbstractHandler<
  SoccerTableEvent,
  SoccerTable
> {
  private readonly _gameHandler: GameHandler;
  private readonly _hardwareHandlerWhite: HardwareHandler;
  private readonly _hardwareHandlerBlack: HardwareHandler;

  constructor(soccerTable: SoccerTable) {
    super(soccerTable, soccerTableEventMapper, HandlerType.SOCCERTABLE, soccerTable);
    this._hardwareHandlerWhite = new HardwareHandler(this, new HardwareTopicManager(this.subject.id, TeamColor.WHITE))
    this._hardwareHandlerBlack = new HardwareHandler(this, new HardwareTopicManager(this.subject.id, TeamColor.BLACK))
    this._gameHandler = new GameHandler(this.subject);
  }

  get gameHandler() {
    return this._gameHandler;
  }
}
