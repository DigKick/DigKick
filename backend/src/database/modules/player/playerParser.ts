import {PlayerEntity} from "./playerEntity.ts";
import {Player} from "../../../models/player.ts";

export class PlayerParser {

  public static toPlayer(playerEntity: PlayerEntity) {
    return new Player(playerEntity.name, playerEntity.hashedKey, playerEntity.elo)
  }

  public static toPlayerEntity(player: Player) {
    const playerEntity = new PlayerEntity()

    playerEntity.name = player.name;
    playerEntity.hashedKey = player.key;
    playerEntity.elo = player.elo;

    return playerEntity
  }

}