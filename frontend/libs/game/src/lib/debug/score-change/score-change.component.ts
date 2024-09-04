import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DkMqttClientService } from '@dig-kick/services';
import { Game, ScoreChange, TeamColor } from '@dig-kick/models';

@Component({
  selector: 'lib-game-debug-score-change',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-change.component.html',
  styleUrl: './score-change.component.scss',
})
export class ScoreChangeComponent {
  game = input.required<Game>();
  teamColor = input.required<TeamColor>();

  constructor(private _dkMqttClientService: DkMqttClientService) {}

  protected readonly ScoreChange = ScoreChange;

  changeScore(scoreChange: ScoreChange) {
    const state = scoreChange === ScoreChange.INCREASE ? 1 : 2;
    const topic = `table/${this.game().tableId}/game/team/${this.teamColor()}/button/${state}`;
    this._dkMqttClientService.doPublish(topic, `{"pinOut": "HIGH"}`);
    this._dkMqttClientService.doPublish(topic, `{"pinOut": "LOW"}`);
  }
}
