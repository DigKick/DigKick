import type {Game} from "../../../models/game.ts";
import {Logger} from "winston";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {GameEntity} from "./gameEntity.ts";
import {GameParser} from "./gameParser.ts";


export class GameService {
  private static logger: Logger = LoggerFactory.getLogger(GameService.name);

  public static async saveGame(game: Game) {
    try {
      const gameEntity = GameParser.toGameEntity(game)

      //gameEntity.teamWhite = await TeamEntity.save(gameEntity.teamWhite);
      //gameEntity.teamBlack = await TeamEntity.save(gameEntity.teamBlack);

      const savedGameEntity = await GameEntity.save(gameEntity);

    } catch (e) {
      this.logger.error(`Could not save or parse game ${game} to database: ${e}`)
    }
  }
}