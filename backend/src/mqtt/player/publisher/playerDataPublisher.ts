import { DataPublisher } from '../../global/publishing/dataPublisher.ts';
import { PlayerEntity } from '../../../database/modules/player/playerEntity.ts';
import { DkMqttClient } from '../../client/client.ts';
import { PlayerDataPublishTopics } from '../topics/playerDataPublishTopics.ts';

export class PlayerDataPublisher extends DataPublisher {
  public static async publishAll() {
    const allPlayers = await PlayerEntity.find();

    allPlayers.sort((playerOne, playerTwo) => {
      return playerTwo.elo - playerOne.elo;
    });

    const playerDtos = allPlayers.map((p) => ({
      id: p.id,
      name: p.name,
      elo: p.elo,
    }));

    DkMqttClient.getInstance().publishWithRetain(
      PlayerDataPublishTopics.ALL,
      JSON.stringify(playerDtos),
    );
  }
}
