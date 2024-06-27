import type {Game} from "../../../models/game.ts";
import {Logger} from "winston";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {GameEntity} from "./gameEntity.ts";
import {GameParser} from "./gameParser.ts";
import type {Table} from "../../../models/table.ts";
import {TableEntity} from "../table/tableEntity.ts";


export class GameRepository {
  private static logger: Logger = LoggerFactory.getLogger(GameRepository.name);

  public static async saveGame(game: Game, table: Table) {
    try {
      const gameEntity = await GameParser.toGameEntity(game)

      const tableEntity = await TableEntity.findOneBy({name: table.name})

      if (tableEntity) {
        gameEntity.table = tableEntity
      }

      await GameEntity.save(gameEntity);
    } catch (e) {
      this.logger.error(`Could not save or parse game ${game} to database: ${e}`)
    }
  }
}