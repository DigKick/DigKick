import { DataPublisher } from '../../global/publishing/dataPublisher.ts';
import { PlayerEntity } from '../../../database/modules/player/playerEntity.ts';
import { DkMqttClient } from '../../client/client.ts';
import { PlayerDataPublishTopics } from '../topics/playerDataPublishTopics.ts';
import { TeamEntity } from '../../../database/modules/team/teamEntity.ts';

export class PlayerDataPublisher extends DataPublisher {
  public static async publishAll() {
    const allPlayers = await PlayerEntity.find();

    allPlayers.sort((playerOne, playerTwo) => {
      return playerTwo.elo - playerOne.elo;
    });

    const playerDtos = await Promise.all(
      allPlayers.map(async (p) => {
        const teams = await TeamEntity.find({
          relations: { playerOne: true, playerTwo: true },
          where: [{ playerOne: { id: p.id } }, { playerTwo: { id: p.id } }],
        });

        const lastFive = teams
          .slice(teams.length - 5, teams.length)
          .map((t) => ({ id: t.id, isWinner: t.isWinner }));

        const won = teams.filter((t) => t.isWinner).length;

        return {
          id: p.id,
          name: p.name,
          elo: p.elo,
          won,
          lost: teams.length - won,
          lastFive: lastFive,
        };
      }),
    );

    DkMqttClient.getInstance().publishWithRetain(
      PlayerDataPublishTopics.ALL,
      JSON.stringify(playerDtos),
    );
  }
}
