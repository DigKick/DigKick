import {Table} from "../../../models/table.ts";
import {GameHandler} from "../../game/handler/gameHandler";
import {TableEventType} from "../events/tableEventType.ts";
import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import {SensorHandler} from "../../hardware/handler/sensorHandler.ts";
import {TeamColor} from "../../../models/team";
import {TableEventMapper} from "../events/tableEventMapper.ts";
import {NfcReaderHandler} from "../../hardware/handler/nfcReaderHandler.ts";
import {PlayerHandler} from "../../player/handler/playerHandler.ts";

export class TableHandler extends DkModelHandler<
  TableEventType,
  Table
> {
  private readonly _gameHandler: GameHandler;
  private readonly _sensorHandlerWhite: SensorHandler;
  private readonly _sensorHandlerBlack: SensorHandler;

  private readonly _playerHandler: PlayerHandler;
  private readonly _nfcHandlerWhite: NfcReaderHandler;
  private readonly _nfcHandlerBlack: NfcReaderHandler;

  constructor(soccerTable: Table) {
    super(soccerTable, HandlerType.SOCCERTABLE, soccerTable);

    this._sensorHandlerWhite = new SensorHandler(this, TeamColor.WHITE);
    this._sensorHandlerBlack = new SensorHandler(this, TeamColor.BLACK);

    this._nfcHandlerWhite = new NfcReaderHandler(this, TeamColor.WHITE);
    this._nfcHandlerBlack = new NfcReaderHandler(this, TeamColor.BLACK);

    this._playerHandler = new PlayerHandler(this, this.subject)

    this._gameHandler = new GameHandler(this.subject);
    this._mapper = new TableEventMapper(soccerTable, this._gameHandler);

    this.triggerEvent(TableEventType.NEW_GAME, "", {});
  }

  get gameHandler() {
    return this._gameHandler;
  }

  get playerHandler() {
    return this._playerHandler;
  }
}
