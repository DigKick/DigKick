import { Component, input } from '@angular/core';
import { Team } from '@dig-kick/models';

@Component({
  selector: 'lib-game-team-player-name-change',
  standalone: true,
  template: '',
})
export class PlayerNameChangeStubComponent {
  tableId = input<number>();
  team = input<Team>();
}
