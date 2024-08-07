import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { DkMqttClientService } from '@dig-kick/services';
import {
  Environment,
  ENVIRONMENT,
  Game,
  ScoreChange,
  TeamColor,
} from '@dig-kick/models';
import { GameStore } from '@dig-kick/store';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'lib-game-view',
  standalone: true,
  imports: [CommonModule, TeamComponent, NgOptimizedImage],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  whiteColor: string = TeamColor.WHITE;
  blackColor: string = TeamColor.BLACK;

  tableId = input<string>();

  readonly environment: Environment = inject(ENVIRONMENT);

  readonly gameStore = inject(GameStore);

  game = computed<Game | undefined>(() => {
    const tableId = this.tableId();
    if (tableId) {
      return this.gameStore.entityMap()[tableId];
    }
    return undefined;
  });

  renameWhite = false;
  renameBlack = false;

    firstTeam: Signal<Team> = computed(() => {
        if(this.isWhiteOnTheLeft()) {
            return this.gameService.gameSignal().teamWhite
        }
        return this.gameService.gameSignal().teamBlack;
    });

    lastTeam: Signal<Team> = computed(() => {
        if(this.isWhiteOnTheLeft()) {
            return this.gameService.gameSignal().teamBlack
        }
        return this.gameService.gameSignal().teamWhite;
    });

  constructor(private _dkMqttClientService: DkMqttClientService) {}

  changeName(color: string) {
    if (color === TeamColor.WHITE) {
      this.renameWhite = true;
    } else {
      this.renameBlack = true;
    }
  }

  submit(color: string, changeNameInputValue: string) {
    let topic = '';
    if (color === TeamColor.WHITE) {
      const playerOneWhite = this.game()?.teamWhite?.playerOne;
      if (playerOneWhite) {
        playerOneWhite.name = changeNameInputValue;
      }
      topic = `table/${this.tableId()}/game/team/${color}/changename`;
      this.renameWhite = false;
    } else {
      const playerOneBlack = this.game()?.teamBlack?.playerOne;
      if (playerOneBlack) {
        playerOneBlack.name = changeNameInputValue;
      }
      topic = `table/${this.tableId()}/game/team/${color}/changename`;
      this.renameBlack = false;
    }
    this._dkMqttClientService.doPublish(
      topic,
      `{"newName": "${changeNameInputValue}"}`,
    );
  }

  registerPlayer(game: Game, color: TeamColor, id: string) {
    this._dkMqttClientService.registerPlayer(id, game.tableId, color);
  }

  protected readonly TeamColor = TeamColor;
  protected readonly ScoreChange = ScoreChange;

  changeScore(game: Game, color: TeamColor, scoreChange: ScoreChange) {
    const state = scoreChange === ScoreChange.INCREASE ? 1 : 2;
    const topic = `table/${game.tableId}/game/team/${color}/button/${state}`;
    this._dkMqttClientService.doPublish(topic, `{"pinOut": "HIGH"}`);
    this._dkMqttClientService.doPublish(topic, `{"pinOut": "LOW"}`);
  }

  reset(game: Game) {
    const topic = `table/${game.tableId}/game/team/white/button/0`;
    this._dkMqttClientService.doPublish(topic, `{"pinOut": "HIGH"}`);
    this._dkMqttClientService.doPublish(topic, `{"pinOut": "LOW"}`);
  }

  toggleDirection() {
    this.isWhiteOnTheLeft.update((isOnTheLeft) => !isOnTheLeft);
  }
}
