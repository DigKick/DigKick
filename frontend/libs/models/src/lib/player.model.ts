import { z } from 'zod';

export const TeamPlayerSchema = z.object({
  elo: z.number(),
  name: z.string(),
});

export type TeamPlayer = z.infer<typeof TeamPlayerSchema>;

export const PlayerSchema = TeamPlayerSchema.extend({
  id: z.number(),
});

export const PlayersSchema = z.array(PlayerSchema);

export type Player = z.infer<typeof PlayerSchema>;
