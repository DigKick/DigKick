import type {EventMapper} from "../../global/eventMapper.ts";
import {PlayerEditEvent} from "./playerEditEvent.ts";
import type {PlayerEditHandler} from "../handler/playerEditHandler.ts";
import type {PlayerNameEditPayload} from "../payloads/playerNameEditPayload.ts";
import {PlayerEntity} from "../../../database/modules/player/playerEntity.ts";
import type {Player} from "../../../models/player.ts";

export class PlayerEditEventMapper implements EventMapper<PlayerEditEvent> {


  constructor(private _playerEditHandler: PlayerEditHandler) {
  }


  map(event: PlayerEditEvent, _: string, payload: PlayerNameEditPayload) {
    switch (event) {
      case PlayerEditEvent.EDIT_NAME:
        if (!this._playerEditHandler.lastPlayerAdded) break
        const playerToBeChanged = this._playerEditHandler.lastPlayerAdded
        this._playerEditHandler.lastPlayerAdded = undefined

        this._updatePlayerName(playerToBeChanged, payload.newName).then()
        break
      default:
        break
    }

    return new Set<PlayerEditEvent>([event]);
  };

  private async _updatePlayerName(player: Player, newName: string): Promise<PlayerEntity | undefined> {
    const playerEntity = await PlayerEntity.findOneBy({
      hashSerialNumber: player.key
    })

    if (!playerEntity) {
      return
    }

    playerEntity.name = newName;

    return await PlayerEntity.save(playerEntity)
  }

}