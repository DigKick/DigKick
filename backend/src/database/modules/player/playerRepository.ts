import type {Logger} from "winston";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {PlayerEntity} from "./playerEntity.ts";
import {PlayerParser} from "./playerParser.ts";
import type {Player} from "../../../models/player.ts";

export class PlayerRepository {

  private static logger: Logger = LoggerFactory.getLogger(PlayerRepository.name);


  public static async getOrCreatePlayer(unhashedSerialNumber: string): Promise<Player> {
    const hashedSerialNumber = unhashedSerialNumber
    const existingPlayer = await PlayerEntity.findOneBy({
      hashSerialNumber: hashedSerialNumber
    })

    if (!existingPlayer) {
      return PlayerParser.toPlayer(await this._createNewPlayer(hashedSerialNumber));
    }

    return PlayerParser.toPlayer(existingPlayer)
  }

  private static async _createNewPlayer(hashedSerialNumber: string) {
    const playerEntity = new PlayerEntity()
    playerEntity.hashSerialNumber = hashedSerialNumber

    return await PlayerEntity.save(playerEntity)
  }
}