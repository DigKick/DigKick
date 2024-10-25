import { Component, input } from '@angular/core';
import { TeamPlayer } from '@dig-kick/models';

@Component({
  selector: 'lib-game-team-player-name',
  standalone: true,
  templateUrl: './player-name.component.html',
})
export class PlayerNameComponent {
  public player = input<TeamPlayer | undefined | null>(undefined);
}
