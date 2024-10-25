import { Component, input } from '@angular/core';
import { Team } from '@dig-kick/models';

@Component({
  selector: 'lib-game-team',
  standalone: true,
  template: '',
})
export class TeamStubComponent {
  public team = input.required<Team | undefined>(undefined);
  public tableId = input<string>('');
}
