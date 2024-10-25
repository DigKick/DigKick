import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DkMqttClientService } from '@dig-kick/services';
import { TeamColor } from '@dig-kick/models';

@Component({
  selector: 'lib-game-debug-register-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-player.component.html',
  styleUrl: './register-player.component.scss',
})
export class RegisterPlayerComponent {
  tableId = input.required<string | undefined>();
  teamColor = input.required<string>();
  name = input.required<string>();

  constructor(private _dkMqttClientService: DkMqttClientService) {}

  registerPlayer() {
    this._dkMqttClientService.registerPlayer(
      `${this.teamColor()}-${this.name()}`,
      `${this.tableId()}`,
      this.teamColor() === 'white' ? TeamColor.WHITE : TeamColor.BLACK,
    );
  }
}
