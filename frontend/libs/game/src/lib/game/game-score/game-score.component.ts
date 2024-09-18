import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-game-score',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './game-score.component.html',
  styleUrl: './game-score.component.scss',
})
export class GameScoreComponent {
  firstTeamScore = input<number>();
  secondTeamScore = input<number>();
}
