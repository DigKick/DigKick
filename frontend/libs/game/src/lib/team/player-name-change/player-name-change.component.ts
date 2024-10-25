import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '@dig-kick/models';
import { DkMqttClientService } from '@dig-kick/services';

@Component({
  selector: 'lib-game-team-player-name-change',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-name-change.component.html',
})
export class PlayerNameChangeComponent {
  tableId = input.required<string>();
  team = input.required<Team>();
  changeActive = signal<boolean>(false);

  constructor(private _dkMqttClientService: DkMqttClientService) {}

  changeNameOfPlayer(newName: string) {
    const player = this.team()?.playerOne;
    if (!player) return;
    player.name = newName;
    const topic = `table/${this.tableId()}/game/team/${this.team()?.color}/changename`;
    this._dkMqttClientService.doPublish(topic, `{"newName": "${newName}"}`);
    this.changeActive.set(false);
  }
}
