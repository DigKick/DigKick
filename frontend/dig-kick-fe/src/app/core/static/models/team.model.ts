import { Player } from "./player.model";

export interface Team {
    color: string;
    score: number;
    isWinner: boolean;
    playerOne?: Player;
    playerTwo?: Player;
}

export enum TeamColor {
    WHITE = 'white',
    BLACK = 'black'
}