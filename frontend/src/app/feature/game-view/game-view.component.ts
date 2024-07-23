import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { GameService } from 'src/app/core/services/game.service';
import { TeamColor } from 'src/app/core/static/models/team.model';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [CommonModule],
  providers: [DkMqttClientService, GameService],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css',
})
export class GameViewComponent implements OnInit {
  whiteColor: string = TeamColor.WHITE;
  blackColor: string = TeamColor.BLACK;

  game$!: Observable<String>;
  whiteScore$!: Observable<String>;
  blackScore$!: Observable<String>;
  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);
  winnerSignal = signal<string>('');
  rankedSignal = signal<string>('');

  tableId!: string | null;

  renameWhite: boolean = false;
  renameBlack: boolean = false;

  constructor(
    private mqttClient: DkMqttClientService,
    private route: ActivatedRoute,
    public gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tableId = params.get('tableId');
      if (this.tableId) {
        this.gameService.setId(this.tableId);
      }
    });
  }

  changeName(color: string) {
    if (color === TeamColor.WHITE) {
      this.renameWhite = true;
    } else {
      this.renameBlack = true;
    }
  }

  submit(color: string) {
    let changeNameInputValue: string = (<HTMLInputElement>(
      document.getElementById('input')
    )).value;
    let topic = '';
    if (color === TeamColor.WHITE) {
      const playerOneWhite = this.gameService.gameSignal().teamWhite.playerOne;
      if (playerOneWhite) {
        playerOneWhite.name = changeNameInputValue;
      }
      topic = `/table/${this.tableId}/game/team/${color}/changename`;
      this.renameWhite = false;
    } else {
      const playerOneBlack = this.gameService.gameSignal().teamBlack.playerOne;
      if (playerOneBlack) {
        playerOneBlack.name = changeNameInputValue;
      }
      topic = `/table/${this.tableId}/game/team/${color}/changename`;
      this.renameBlack = false;
    }
    this.mqttClient.doPublish(
      topic,
      0,
      `{"newName": "${changeNameInputValue}"}`
    );
  }

  onKey(event: any) {
    const inputValue = event.target.value;
  }
}
