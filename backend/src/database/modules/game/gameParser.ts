import {Game} from "../../../models/game.ts";
import {GameEntity} from "./gameEntity.ts";
import {GameMode} from "../../../models/gameMode.ts";
import {TeamParser} from "../team/teamParser.ts";
import {DkParseException} from "../../dkParseException.ts";

export class GameParser {

  private static isValidGameMode(input: string): boolean {
    return (Object.values(GameMode) as string[]).includes(input);
  }

  public static toGame(gameEntity: GameEntity): Game {
    if (!this.isValidGameMode(gameEntity.gameMode)) {
      throw new DkParseException(Game.constructor.name, Game.constructor.name)
    }

    try {
      const game = new Game();

      game.gameMode = gameEntity.gameMode as GameMode

      game.teamBlack = TeamParser.toTeam(gameEntity.teamBlack);
      game.teamWhite = TeamParser.toTeam(gameEntity.teamWhite);

      return game
    } catch (e) {
      throw new DkParseException(GameEntity.constructor.name, Game.constructor.name)
    }
  }

  public static async toGameEntity(game: Game): Promise<GameEntity> {
    try {
      const gameEntity = new GameEntity();

      gameEntity.gameMode = game.gameMode.toString();
      gameEntity.teamWhite = await TeamParser.toTeamEntity(game.teamWhite);
      gameEntity.teamBlack = await TeamParser.toTeamEntity(game.teamBlack);
      gameEntity.pointsToWin = game.pointsToWin;

      return gameEntity
    } catch (e) {
      throw new DkParseException(Game.constructor.name, GameEntity.constructor.name)
    }
  }
}