import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-game-score',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class GameScoreStubComponent {
  teamWhiteScore = input<number>();
  teamBlackScore = input<number>();
}
