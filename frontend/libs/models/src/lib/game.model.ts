import { TeamSchema } from './team.model';
import { z } from 'zod';

export enum GameMode {
  DEFAULT = 'DEFAULT',
  RANKED = 'RANKED',
}

export const GameSchema = z.object({
  gameMode: z.nativeEnum(GameMode),
  teamWhite: TeamSchema.optional(),
  teamBlack: TeamSchema.optional(),
  pointsToWin: z.number(),
});

export type Game = z.infer<typeof GameSchema> & { tableId: string };
