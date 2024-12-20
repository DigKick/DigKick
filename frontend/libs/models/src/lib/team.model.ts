import { z } from 'zod';
import { TeamPlayerSchema } from './player.model';

export enum TeamColor {
  WHITE = 'white',
  BLACK = 'black',
}

export enum ScoreChange {
  DECREASE = -1,
  INCREASE = 1,
}

export const TeamSchema = z.object({
  color: z.nativeEnum(TeamColor),
  score: z.number(),
  isWinner: z.boolean(),
  playerOne: TeamPlayerSchema.nullish(),
  playerTwo: TeamPlayerSchema.nullish(),
});

export type Team = z.infer<typeof TeamSchema>;
