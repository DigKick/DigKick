import { Team } from "./team.model";

export interface Game {
    gameMode: GameMode;
    teamWhite: Team;
    teamBlack: Team;
    pointsToWin: number;
}

export enum GameMode {
    DEFAULT = 'DEFAULT',
    RANKED = 'RANKED'
}