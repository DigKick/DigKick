import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { GameService } from 'src/app/core/services/game.service';
import { Game, GameMode } from 'src/app/core/static/models/game.model';
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

  whiteColor: string = 'white';
  blackColor: string = 'black';

  game$!: Observable<String>;
  whiteScore$!: Observable<String>;
  blackScore$!: Observable<String>;
  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);
  winnerSignal = signal<string>('');
  rankedSignal = signal<string>('');
  lastRegisteredPlayerWhiteSignal = signal<string>('');
  lastRegisteredPlayerBlackSignal = signal<string>('');

  tableId!: string | null;

  renameWhite: boolean = false;
  renameBlack: boolean = false;

  constructor(private mqttClient: DkMqttClientService, private route: ActivatedRoute, public gameService: GameService) {
    this.player1 = {
      id: String(1),
      createdAt: "00.00.0000",
      updatedAt: "00.00.0000",
      elo: 324,
      name: 'player 1',
      hashSerialNumber: "CENCORED"
    }
    this.player2 = {
      id: String(2),
      createdAt: "00.00.0000",
      updatedAt: "00.00.0000",
      elo: 217,
      name: 'player 2',
      hashSerialNumber: "CENCORED"
    }
    this.player3 = {
      id: String(3),
      createdAt: "00.00.0000",
      updatedAt: "00.00.0000",
      elo: 412,
      name: 'player 3',
      hashSerialNumber: "CENCORED"
    }
    this.player4 = {
      id: String(2),
      createdAt: "00.00.0000",
      updatedAt: "00.00.0000",
      elo: 77,
      name: 'player 4',
      hashSerialNumber: "CENCORED"
    }
    this.white = {
      color: 'white',
      score: 8,
      isWinner: false,

    }
    this.black = {
      color: 'black',
      score: 6,
      isWinner: false,
    }

    this.white.playerOne = this.player1;
    this.white.playerTwo = this.player2;
    this.black.playerOne = this.player3;
    this.black.playerTwo = this.player4;

    this.game = {
      gameMode: GameMode.RANKED,
      teamWhite: this.white,
      teamBlack: this.black,
      pointsToWin: 10,
    }
    this.lastRegisteredPlayerWhiteSignal.set(this.player1.name);
    this.lastRegisteredPlayerBlackSignal.set(this.player3.name)
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tableId = params.get('tableId');
      if (this.tableId) {
        this.gameService.setId(this.tableId);
      }
    });
  }

  changeName(color: string) {
    if (color === this.whiteColor) {
      this.renameWhite = true;
    } else {
      this.renameBlack = true;
    }
  }

  submit(color: string) {
    let str: string = (<HTMLInputElement>document.getElementById("input")).value;
    let topic = ''
    if (color === this.whiteColor) {
      this.lastRegisteredPlayerWhiteSignal.set(str);
      const playerOneWhite = this.gameService.gameSignal().teamWhite.playerOne
      if (playerOneWhite) {
        playerOneWhite.name = str;
      }
      topic = `/table/${this.tableId}/game/team/${color}/changename`;
      this.renameWhite = false;
    } else {
      this.lastRegisteredPlayerBlackSignal.set(str);
      const playerOneBlack = this.gameService.gameSignal().teamBlack.playerOne
      if (playerOneBlack) {
        playerOneBlack.name = str;
      }
      topic = `/table/${this.tableId}/game/team/${color}/changename`;
      this.renameBlack = false;
    }
    console.log('topic', topic)
    this.mqttClient.doPublish(topic, 0, `{"newName": "${str}"}`);
  }

  onKey(event: any) {
    const inputValue = event.target.value;
  }
}
