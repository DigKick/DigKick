import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { ScoreService } from 'src/app/core/services/score.service';
import { Game } from 'src/app/core/static/models/game.model';
import { Player } from 'src/app/core/static/models/player.model';
import { Team } from 'src/app/core/static/models/team.model';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [CommonModule],
  providers: [DkMqttClientService, ScoreService],
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

  tables: Signal<String[]>;

  game$!: Observable<String>;
  whiteScore$!: Observable<String>;
  blackScore$!: Observable<String>;
  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);
  winnerSignal = signal<string>('');
  rankedSignal = signal<string>('');

  tableId!: string | null;

  constructor(private mqttClient: DkMqttClientService, private route: ActivatedRoute, public scoreService: ScoreService) {
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
    });
   this.game$ = this.mqttClient.subscribe(`/table/${this.tableId}/game`)
   this.game$.subscribe((message: String) => {
    try {
      this.scoreService.whiteScoreSignal.set(Number(JSON.parse(message.toString()).teamWhite.score));
      this.scoreService.blackScoreSignal.set(Number(JSON.parse(message.toString()).teamBlack.score));
      this.winnerSignal.set((JSON.parse(message.toString()).teamWinner.color).toString())
      //this.rankedSignal.set((JSON.parse(message.toString()).gameMode).toString())
    } catch(e) {
      console.log(e);
      console.log('GAME CATCH')
    }
  })
  this.blackScore$ = this.mqttClient.subscribe(`/table/${this.tableId}/team/black/score`)
    this.blackScore$.subscribe((message: String) => {
      try {
        console.log(Number(JSON.parse(message.toString()).score))
        this.scoreService.blackScoreSignal.set(Number(JSON.parse(message.toString()).score));
      } catch(e) {
        console.log(e);
        console.log('BLACK SCORE CATCH')
      }
    })
    this.whiteScore$ = this.mqttClient.subscribe(`/table/${this.tableId}/team/white/score`)
    this.whiteScore$.subscribe((message: String) => {
      try {
        this.scoreService.whiteScoreSignal.set(Number(JSON.parse(message.toString()).score));
      } catch(e) {
        console.log(e);
        console.log('WHITE SCORE CATCH')
      }
    })
  }
}
