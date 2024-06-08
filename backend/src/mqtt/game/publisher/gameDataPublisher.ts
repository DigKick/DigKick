import {DkMqttClient} from "../../client/client.ts";
import {GameDataPublishTopics} from "../topics/gameDataPublishTopics.ts";
import {DataPublisher} from "../../global/publishing/dataPublisher.ts";
import {Obj2StringParser} from "../../util/obj2stringParser.ts";
import {GameEntity} from "../../../database/modules/game/gameEntity.ts";

export class GameDataPublisher extends DataPublisher {

  private static instance: GameDataPublisher;

  public static getInstance(): GameDataPublisher {
    if (!GameDataPublisher.instance) {
      GameDataPublisher.instance = new GameDataPublisher();
    }
    return GameDataPublisher.instance
  }

  private constructor() {
    super();
  }

  public async publishRecent() {
    const games = GameEntity.find({take: GameDataPublisher.recentItemCount})

    games.then(games => {
      if (games.length === 0) {
        return
      }

      DkMqttClient.getInstance().publishWithRetain(GameDataPublishTopics.RECENT, Obj2StringParser.objectToString(games) || "[]")
    })
  }

  public async publishById(id: number) {
    const game = await GameEntity.findOneBy({id: id})

    if (!game) {
      DkMqttClient.getInstance().publish(GameDataPublishTopics.BASE + "/" + id, "{}")
      return
    }

    DkMqttClient.getInstance().publish(GameDataPublishTopics.BASE + "/" + id, JSON.stringify(game))
  }
}