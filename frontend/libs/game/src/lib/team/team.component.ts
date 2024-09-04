import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '@dig-kick/models';
import { PlayerNameChangeComponent } from './player-name-change/player-name-change.component';

@Component({
  selector: 'lib-game-team',
  standalone: true,
  imports: [CommonModule, PlayerNameChangeComponent],
  templateUrl: './team.component.html',
})
export class TeamComponent {
  public team = input<Team | undefined>(undefined);
  public tableId = input<number>();
}
