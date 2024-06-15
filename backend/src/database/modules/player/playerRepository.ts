import type {Logger} from "winston";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {PlayerEntity} from "./playerEntity.ts";
import {PlayerParser} from "./playerParser.ts";
import type {Player} from "../../../models/player.ts";
import {SerialNumberHasher} from "./serialNumberHasher.ts";

export class PlayerRepository {

  private static logger: Logger = LoggerFactory.getLogger(PlayerRepository.name);


  public static async getOrCreatePlayer(unhashedSerialNumber: string): Promise<Player> {
    const hashedSerialNumber = await SerialNumberHasher.hashSerialNumber(unhashedSerialNumber)
    const existingPlayer = await this.findPlayerByUnhashedKey(unhashedSerialNumber)

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

  public static async findPlayerByUnhashedKey(unhashedKey: string): Promise<PlayerEntity | null> {
    const players = await PlayerEntity.find({
      select: ["id", "hashSerialNumber"]
    })

    for (const player of players) {
      const isMatch = await SerialNumberHasher.hashValidator(player.hashSerialNumber, unhashedKey)
      if (isMatch) {
        return await PlayerEntity.findOneBy({id: player.id});
      }
    }
    return null
  }
}