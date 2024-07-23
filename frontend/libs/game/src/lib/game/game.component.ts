import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DkMqttClientService, GameService } from '@dig-kick/services';
import { TeamColor } from '@dig-kick/models';

@Component({
  selector: 'lib-game-view',
  standalone: true,
  imports: [CommonModule],
  providers: [DkMqttClientService, GameService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  whiteColor: string = TeamColor.WHITE;
  blackColor: string = TeamColor.BLACK;

  game$!: Observable<string>;
  whiteScore$!: Observable<string>;
  blackScore$!: Observable<string>;
  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);
  winnerSignal = signal<string>('');
  rankedSignal = signal<string>('');

  tableId!: string | null;

  renameWhite = false;
  renameBlack = false;

  constructor(
    private mqttClient: DkMqttClientService,
    private route: ActivatedRoute,
    public gameService: GameService,
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
    const changeNameInputValue: string = (<HTMLInputElement>(
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
      `{"newName": "${changeNameInputValue}"}`,
    );
  }

  onKey(event: any) {
    const inputValue = event.target.value;
  }
}
