import type {EventMapper} from "../../abstract/eventMapper";
import {SoccerTableEventType} from "./soccerTableEventType";
import {SoccerTable} from "../../../models/soccerTable";
import {GameHandler} from "../../game/handler/gameHandler";
import {GameEventType} from "../../game/events/gameEvent";
import {DkMqttClient} from "../../client/client";
import {BaseTopicFactory} from "../../util/baseTopicFactory";
import {SoccerTablePayload} from "../payloads/soccerTablePayload";
import {MqttObjectUpdater} from "../../util/mqttObjectUpdater";
import {BasicTerm} from "../../util/basicTerm";


export class SoccerTableEventMapper implements EventMapper<SoccerTableEventType> {

  private _gameHandler: GameHandler;
  private readonly _soccerTable: SoccerTable;
  private _mqttObjectUpdater: MqttObjectUpdater<SoccerTable>;

  constructor(soccerTable: SoccerTable, gameHandler: GameHandler) {
    this._soccerTable = soccerTable;
    this._gameHandler = gameHandler;
    this._mqttObjectUpdater = new MqttObjectUpdater<SoccerTable>(soccerTable,
      {prefix: `/${BasicTerm.TABLE}`, publishWithRetain: true, instantPublish: true})
  }

  map(event: SoccerTableEventType) {
    let triggeredEvents = [event]

    switch (event) {
      case SoccerTableEventType.NEW_GAME:
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE)
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE)
        this.publishNewGameValues();
        break;

      case SoccerTableEventType.FINISH_GAME:
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE)
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE)
        this.publishNewGameValues();
        break;

      case SoccerTableEventType.CANCEL_GAME:
        this._soccerTable.newGame();
        this._gameHandler.triggerEvent(GameEventType.WHITE_SCORE_CHANGE)
        this._gameHandler.triggerEvent(GameEventType.BLACK_SCORE_CHANGE)
        this.publishNewGameValues();
        break;

      default:
        break;
    }

    if (event.includes(SoccerTableEventType.GAME)) {
      triggeredEvents.push(SoccerTableEventType.NEW_GAME)
    }

    return new Set(triggeredEvents)
  }

  private publishNewGameValues() {
    this._mqttObjectUpdater.commit(this._soccerTable)
    this._mqttObjectUpdater.publish()
  }
}