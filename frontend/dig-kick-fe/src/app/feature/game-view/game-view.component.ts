import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { GameService } from 'src/app/core/services/game.service';
import { Game } from 'src/app/core/static/models/game.model';
import { Player } from 'src/app/core/static/models/player.model';
import { Team } from 'src/app/core/static/models/team.model';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [CommonModule],
  providers: [DkMqttClientService, GameService],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent implements OnInit {
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;

  white: Team;
  black: Team;

  game: Game;

  game$!: Observable<String>;
  whiteScore$!: Observable<String>;
  blackScore$!: Observable<String>;
  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);
  winnerSignal = signal<string>('');
  rankedSignal = signal<string>('');

  tableId!: string | null;

  constructor(private mqttClient: DkMqttClientService, private route: ActivatedRoute, public gameService: GameService) {
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
      id: `1`,
      teams: [this.white, this.black],
      pointsToWin: '2',
      winner: undefined,
      mode: ''
    }
    
  } 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tableId = params.get('tableId');
      if (this.tableId) {
        this.gameService.setId(this.tableId);
      }
    });
  }
}
