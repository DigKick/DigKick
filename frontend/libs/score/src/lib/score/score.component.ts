import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { PlayerStore } from '@dig-kick/store';
import { Player } from '@dig-kick/models';

@Component({
  selector: 'lib-score-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent {
  readonly playerStore = inject(PlayerStore);

  players: Signal<Player[]> = this.playerStore.entities;
}
