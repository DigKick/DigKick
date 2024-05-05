import { Team } from "./team.model";

export interface Game {
    id: string;
    teams: Team[];
    pointsToWin: string;
    winner: string;
}