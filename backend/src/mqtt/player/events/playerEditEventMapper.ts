import type {EventMapper} from "../../global/eventMapper.ts";
import {PlayerEditEvent} from "./playerEditEvent.ts";
import type {PlayerEditHandler} from "../handler/playerEditHandler.ts";
import type {PlayerNameEditPayload} from "../payloads/playerNameEditPayload.ts";
import {PlayerRepository} from "../../../database/modules/player/playerRepository.ts";
import {PlayerDataPublisher} from "../publisher/playerDataPublisher.ts";

export class PlayerEditEventMapper implements EventMapper<PlayerEditEvent> {


  constructor(private _playerEditHandler: PlayerEditHandler) {
  }


  map(event: PlayerEditEvent, _: string, payload: PlayerNameEditPayload) {
    switch (event) {
      case PlayerEditEvent.EDIT_NAME:
        if (!this._playerEditHandler.lastPlayerAdded) break
        const playerToBeChanged = this._playerEditHandler.lastPlayerAdded
        this._playerEditHandler.lastPlayerAdded = undefined

        PlayerRepository.updatePlayerName(playerToBeChanged, payload.newName).then(async () => {
          await PlayerDataPublisher.publishAll()
        })
        break
      default:
        break
    }

    return new Set<PlayerEditEvent>([event]);
  };

}