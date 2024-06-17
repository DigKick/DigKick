import type {Logger} from "winston";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {PlayerEntity} from "./playerEntity.ts";
import {PlayerParser} from "./playerParser.ts";
import type {Player} from "../../../models/player.ts";
import {SerialNumberHasher} from "./serialNumberHasher.ts";
import type {Game} from "../../../models/game.ts";
import {EloCalculator} from "../../../models/eloCalculator.ts";

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

  public static async updatePlayerEloInGame(game: Game) {
    if (!game.teamWhite.playerOne || !game.teamWhite.playerTwo ||
      !game.teamBlack.playerOne || !game.teamBlack.playerTwo) {
      return
    }

    const teamWhiteEloDiff = EloCalculator.getEloDifference(game.teamWhite, game.teamBlack)
    const teamBlackEloDiff = EloCalculator.getEloDifference(game.teamBlack, game.teamWhite)

    PlayerRepository._updatePlayerElo(game.teamWhite.playerOne, teamWhiteEloDiff)
    PlayerRepository._updatePlayerElo(game.teamWhite.playerTwo, teamWhiteEloDiff)
    PlayerRepository._updatePlayerElo(game.teamBlack.playerOne, teamBlackEloDiff)
    PlayerRepository._updatePlayerElo(game.teamBlack.playerTwo, teamBlackEloDiff)
  }

  private static _updatePlayerElo(player: Player, eloDiff: number) {
    PlayerEntity.findOneBy({hashSerialNumber: player.key}).then((playerEntity) => {
      if (!playerEntity) {
        return
      }
      playerEntity.elo += eloDiff

      if (playerEntity.elo < 0) {
        playerEntity.elo = 0
      }

      PlayerEntity.save(playerEntity).then()
    })
  }
}