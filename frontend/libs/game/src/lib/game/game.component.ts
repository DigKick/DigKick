import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  signal,
  Signal,
} from '@angular/core';
import { DkMqttClientService } from '@dig-kick/services';
import {
  Environment,
  ENVIRONMENT,
  Game,
  Team,
  TeamColor,
} from '@dig-kick/models';
import { GameStore } from '@dig-kick/store';
import { TeamComponent } from '../team/team.component';
import { ScoreChangeComponent } from '../debug/score-change/score-change.component';
import { TeamSwapComponent } from './team-swap/team-swap.component';
import { GameScoreComponent } from './game-score/game-score.component';
import { RegisterPlayerComponent } from '../debug/register-player/register-player.component';

@Component({
  selector: 'lib-game-view',
  standalone: true,
  imports: [
    CommonModule,
    TeamComponent,
    NgOptimizedImage,
    ScoreChangeComponent,
    TeamSwapComponent,
    GameScoreComponent,
    RegisterPlayerComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  tableId = input.required<string>();

  private _isWhiteTeamFirst = signal(true);

  readonly environment: Environment = inject(ENVIRONMENT);

  readonly gameStore = inject(GameStore);

  public game = computed<Game | undefined>(() => {
    const tableId = this.tableId();
    if (tableId) {
      return this.gameStore.entityMap()[tableId];
    }
    return undefined;
  });

  public firstTeam: Signal<Team | undefined> = computed(() => {
    return this._isWhiteTeamFirst()
      ? this.game()?.teamWhite
      : this.game()?.teamBlack;
  });

  public lastTeam: Signal<Team | undefined> = computed(() => {
    return this._isWhiteTeamFirst()
      ? this.game()?.teamBlack
      : this.game()?.teamWhite;
  });

  constructor(private _dkMqttClientService: DkMqttClientService) {}

  protected readonly TeamColor = TeamColor;

  reset(game: Game) {
    const topic = `table/${game.tableId}/game/team/white/button/0`;
    this._dkMqttClientService.doPublish(topic, `{"pinOut": "HIGH"}`);
    this._dkMqttClientService.doPublish(topic, `{"pinOut": "LOW"}`);
  }

  toggleDirection() {
    this._isWhiteTeamFirst.update((isOnTheLeft) => !isOnTheLeft);
  }
}
