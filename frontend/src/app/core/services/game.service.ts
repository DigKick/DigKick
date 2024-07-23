import { Injectable, effect, signal } from '@angular/core';
import { DkMqttClientService } from './dk-mqtt-client.service';
import { Observable } from 'rxjs';
import { Game, GameMode } from '../static/models/game.model';
import { TeamColor } from '../static/models/team.model';

@Injectable()
export class GameService {
  tableId = signal<String>('');
  game$!: Observable<String>;
  gameSignal = signal<Game>({
    gameMode: GameMode.DEFAULT,
    teamBlack: {
      color: TeamColor.BLACK,
      score: 0,
      isWinner: false,
      playerOne: {
        id: '',
        createdAt: '',
        updatedAt: '',
        name: 'Player 3',
        elo: 0,
        hashSerialNumber: 'CENSORED',
      },
      playerTwo: {
        id: '',
        createdAt: '',
        updatedAt: '',
        name: 'Player 4',
        elo: 0,
        hashSerialNumber: 'CENSORED',
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
        name: 'Player 1',
        elo: 0,
        hashSerialNumber: 'CENSORED',
      },
      playerTwo: {
        id: '',
        createdAt: '',
        updatedAt: '',
        name: 'Player 2',
        elo: 0,
        hashSerialNumber: 'CENSORED',
      },
    },
    pointsToWin: 10,
  });

  constructor(private mqttClient: DkMqttClientService) {
    effect(() => {
      this.game$ = this.mqttClient.subscribe(`/table/${this.tableId()}/game`);
      this.game$.subscribe((message: String) => {
        try {
          const game: Game = JSON.parse(message.toString());
          this.gameSignal.set(game);
        } catch (e) {
          console.log(e);
        }
      });
    });
  }

  setId(id: String) {
    this.tableId.set(id);
  }
}
