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

      await GameEntity.save(gameEntity);
    } catch (e) {
      this.logger.error(`Could not save or parse game ${game} to database: ${e}`)
    }
  }
}