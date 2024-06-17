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

  public static async updatePlayerElo(game: Game) {
    const gameClone = structuredClone(game)
    if (!gameClone.teamWhite.playerOne || !gameClone.teamWhite.playerTwo ||
      !gameClone.teamBlack.playerOne || !gameClone.teamBlack.playerTwo) {
      console.log(">>> not enough players")
      return
    }

    const teamWhiteEloDiff = EloCalculator.getEloDifference(gameClone.teamWhite, gameClone.teamBlack)
    const teamBlackEloDiff = EloCalculator.getEloDifference(gameClone.teamBlack, gameClone.teamWhite)

    console.log("team white elo: ", teamWhiteEloDiff)
    console.log("team black elo: ", teamBlackEloDiff)

    const newPlayerOneWhite = gameClone.teamWhite.playerOne
    newPlayerOneWhite.elo += teamWhiteEloDiff

    const newPlayerTwoWhite = gameClone.teamWhite.playerTwo
    newPlayerTwoWhite.elo += teamWhiteEloDiff

    const newPlayerOneBlack = gameClone.teamBlack.playerOne
    newPlayerOneBlack.elo += teamBlackEloDiff

    const newPlayerTwoBlack = gameClone.teamBlack.playerTwo
    newPlayerTwoBlack.elo += teamBlackEloDiff

    await PlayerEntity.save(newPlayerOneWhite)
    await PlayerEntity.save(newPlayerTwoWhite)

    await PlayerEntity.save(newPlayerOneBlack)
    await PlayerEntity.save(newPlayerTwoBlack)
  }
}