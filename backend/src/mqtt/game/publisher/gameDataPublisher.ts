import {DkMqttClient} from "../../client/client.ts";
import {GameDataPublishTopics} from "../topics/gameDataPublishTopics.ts";
import {DataPublisher} from "../../abstract/dataPublisher.ts";
import {Obj2StringParser} from "../../util/obj2stringParser.ts";
import {GameEntity} from "../../../database/modules/game/gameEntity.ts";

export class GameDataPublisher extends DataPublisher {

  public static async publishRecent() {
    const games = GameEntity.find({take: GameDataPublisher.recentItemCount})

    games.then(games => {
      if (games.length === 0) {
        return
      }

      DkMqttClient.getInstance().publishWithRetain(GameDataPublishTopics.RECENT, Obj2StringParser.arrayToString(games) || "[]")
    })
  }
}