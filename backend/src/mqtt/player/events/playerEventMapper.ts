import type {EventMapper} from "../../global/eventMapper.ts";
import type {PlayerEventType} from "./playerEvent.ts";
import {Game} from "../../../models/game.ts";
import {Table} from "../../../models/table.ts";
import {MqttObjectUpdater} from "../../util/mqttObjectUpdater/mqttObjectUpdater.ts";
import {MqttObjectUpdaterFactory} from "../../util/mqttObjectUpdater/mqttObjectUpdaterFactory.ts";
import {BasicTerm} from "../../util/basicTerm.ts";

export class PlayerEventMapper implements EventMapper<PlayerEventType> {

  private readonly _game: Game;
  private readonly _soccerTable: Table;
  private readonly _mqttObjectUpdaterGame: MqttObjectUpdater<Table>;

  constructor(soccerTable: Table) {
    this._soccerTable = soccerTable;
    this._game = soccerTable.game;
    this._mqttObjectUpdaterGame = MqttObjectUpdaterFactory.getMqttObjectUpdater(
      this._soccerTable,
      {
        prefix: `/${BasicTerm.TABLE}`,
        instantPublish: true,
        publishWithRetain: true,
      },
    );
  }

  map(event: PlayerEventType, topic?: string | undefined, payload?: any) {

    return new Set([event]);
  };

}