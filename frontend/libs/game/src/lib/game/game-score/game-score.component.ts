import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { PlayerNameComponent } from '../../team/player-name/player-name.component';

@Component({
  selector: 'lib-game-score',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, PlayerNameComponent],
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {
  firstTeamScore = input<number>();
  secondTeamScore = input<number>();
}
