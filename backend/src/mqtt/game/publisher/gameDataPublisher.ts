import {DkMqttClient} from "../../client/client.ts";
import {GameDataPublishTopics} from "../topics/gameDataPublishTopics.ts";
import {DataPublisher} from "../../global/publishing/dataPublisher.ts";
import {Obj2StringParser} from "../../util/obj2stringParser.ts";
import {GameEntity} from "../../../database/modules/game/gameEntity.ts";
import {Between} from "typeorm";

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
    const gamePromises = GameEntity.find({take: GameDataPublisher.recentItemCount})

    gamePromises.then(games => {
      if (games.length === 0) {
        return
      }

      DkMqttClient.getInstance().publishWithRetain(GameDataPublishTopics.RECENT, Obj2StringParser.objectToString(games) || "[]")
    })
  }

  public async publishById(id: number) {
    const gameEntity = await GameEntity.findOneBy({id: id})

    if (!gameEntity) {
      DkMqttClient.getInstance().publish(GameDataPublishTopics.BASE + "/" + id, "{}")
      return
    }

    DkMqttClient.getInstance().publish(GameDataPublishTopics.BASE + "/" + id, JSON.stringify(gameEntity))
  }

  public async publishByTimeSpan(from: Date, to: Date) {
    const gameEntities = await GameEntity.find({
      where: {
        createdAt: Between(from, to)
      }
    })

    if (!gameEntities) {
      DkMqttClient.getInstance().publish(GameDataPublishTopics.BASE + "/" + from.toDateString() + "/"
        + to.toDateString(), "{}")
      return
    }

    DkMqttClient.getInstance().publish(GameDataPublishTopics.BASE + "/"
      + from.toDateString() + "/" + to.toDateString(), JSON.stringify(gameEntities));
  }
}