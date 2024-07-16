import {Team, TeamColor} from "./team.model";

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

export const emptyGame = {
    gameMode: GameMode.DEFAULT,
    teamBlack: {
        color: TeamColor.BLACK,
        score: 0,
        isWinner: false,
        playerOne: {
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            elo: 0,
            hashSerialNumber: '',
        },
        playerTwo: {
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            elo: 0,
            hashSerialNumber: '',
        },
    },
    teamWhite: {
        color: TeamColor.WHITE,
        score: 0,
        isWinner: false,
        playerOne: {
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            elo: 0,
            hashSerialNumber: '',
        },
        playerTwo: {
            id: '',
            createdAt: '',
            updatedAt: '',
            name: '',
            elo: 0,
            hashSerialNumber: '',
        },
    },
    pointsToWin: 10
}
