import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScoreService } from '@dig-kick/services';

@Component({
  selector: 'lib-score-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent {
  constructor(protected scoreService: ScoreService) {}
}
