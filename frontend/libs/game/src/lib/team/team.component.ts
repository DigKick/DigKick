import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '@dig-kick/models';

@Component({
  selector: 'lib-game-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
})
export class TeamComponent {
  public team = input<Team | undefined>(undefined);
}
