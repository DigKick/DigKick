import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENVIRONMENT, Environment, Team } from '@dig-kick/models';
import { PlayerNameChangeComponent } from './player-name-change/player-name-change.component';
import { RegisterPlayerComponent } from '../debug/register-player/register-player.component';
import { PlayerNameComponent } from './player-name/player-name.component';

@Component({
  selector: 'lib-game-team',
  standalone: true,
  imports: [
    CommonModule,
    PlayerNameChangeComponent,
    RegisterPlayerComponent,
    PlayerNameComponent,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  readonly environment: Environment = inject(ENVIRONMENT);

  public team = input<Team | undefined>(undefined);
  public tableId = input<number>();
}
