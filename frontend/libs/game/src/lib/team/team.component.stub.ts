import { Component, input } from '@angular/core';
import { Team } from '@dig-kick/models';

@Component({
  selector: 'lib-game-team',
  standalone: true,
  template: '',
})
export class TeamStubComponent {
  public team = input<Team | undefined>(undefined);
}
