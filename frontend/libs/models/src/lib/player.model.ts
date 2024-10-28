import { z } from 'zod';

export const TeamPlayerSchema = z.object({
  elo: z.number(),
  name: z.string(),
  winRate: z.number().nullish(),
  lastFive: z
    .array(z.object({ id: z.number(), isWinner: z.boolean() }))
    .nullish(),
});

export type TeamPlayer = z.infer<typeof TeamPlayerSchema>;

export const PlayerSchema = TeamPlayerSchema.extend({
  id: z.number(),
});

export const PlayersSchema = z.array(PlayerSchema);

export type Player = z.infer<typeof PlayerSchema>;
