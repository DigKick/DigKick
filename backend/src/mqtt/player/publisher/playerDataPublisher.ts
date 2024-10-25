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
          .slice(-5)
          .map((t) => ({ id: t.id, isWinner: t.isWinner }));

        const won: number = teams.filter((t) => t.isWinner).length;
        const lost: number = teams.length - won;

        let winRate: number | null = null;

        if (lost == 0) {
          if (won > 0) {
            winRate = 1;
          }
        } else {
          winRate = won / (won + lost);
        }

        return {
          id: p.id,
          name: p.name,
          elo: p.elo,
          winRate,
          lastFive,
        };
      }),
    );

    DkMqttClient.getInstance().publishWithRetain(
      PlayerDataPublishTopics.ALL,
      JSON.stringify(playerDtos),
    );
  }
}
