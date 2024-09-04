import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
  selector: 'lib-game-team-swap',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './team-swap.component.html',
  styleUrl: './team-swap.component.scss',
})
export class TeamSwapComponent {
  onSwapTeams = output<void>();
}
