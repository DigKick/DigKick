import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { Game } from 'src/app/core/static/models/game.model';
import { Player } from 'src/app/core/static/models/player.model';
import { Team } from 'src/app/core/static/models/team.model';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;

  white: Team;
  black: Team;

  game: Game;

  tables: Signal<String[]>;

  constructor(private mqttClient: DkMqttClientService) {
    this.tables = mqttClient.signalTableIds;
    this.player1 = {
      id: String(1),
      firstname: 'player',
      lastname: '1',
      score: 345
    }
   this.player2 = {
      id: String(2),
      firstname: 'player',
      lastname: '2',
      score: 217
    }
    this.player3 = {
      id: String(3),
      firstname: 'player',
      lastname: '3',
      score: 313
    }
    this.player4 = {
      id: String(4),
      firstname: 'player',
      lastname: '4',
      score: 123
    }
    this.white = {
      color: 'white',
      score: 8
    }
    this.black = {
      color: 'black',
      score: 6
    }

    this.game = {
      id: '1',
      teams: [this.white, this.black],
      pointsToWin: '2',
      winner: '',
      mode: 'ranked'
    }
  } 
}
