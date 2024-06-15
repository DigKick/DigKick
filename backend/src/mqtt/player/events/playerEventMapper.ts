import type {EventMapper} from "../../global/eventMapper.ts";
import {PlayerEventType} from "./playerEvent.ts";
import {Game} from "../../../models/game.ts";
import {Table} from "../../../models/table.ts";
import type {NfcReaderPayload} from "../../hardware/payloads/nfcReaderPayload.ts";
import {PlayerRepository} from "../../../database/modules/player/playerRepository.ts";
import type {TableHandler} from "../../table/handler/tableHandler.ts";
import {GameEventType} from "../../game/events/gameEvent.ts";

export class PlayerEventMapper implements EventMapper<PlayerEventType> {

  private readonly _game: Game;
  private readonly _table: Table;
  private readonly _tableHandler: TableHandler;

  constructor(tableHandler: TableHandler, table: Table) {
    this._table = table;
    this._game = table.game;

    this._tableHandler = tableHandler
  }

  map(event: PlayerEventType, topic: string, payload: NfcReaderPayload) {
    switch (event) {
      case PlayerEventType.PLAYER_REGISTER_BLACK_TEAM:
        PlayerRepository.getOrCreatePlayer(payload.serialNumber).then((player) => {
          this._game.teamBlack.addPlayer(player)
          this._tableHandler.gameHandler.triggerEvent(GameEventType.PLAYER_CHANGE, topic, payload)
        })
        break

      case PlayerEventType.PLAYER_REGISTER_WHITE_TEAM:
        PlayerRepository.getOrCreatePlayer(payload.serialNumber).then((player) => {
          this._game.teamWhite.addPlayer(player)
        })
        break

      default:
        break
    }

    return new Set([event]);
  };

}