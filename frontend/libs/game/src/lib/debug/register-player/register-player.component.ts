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
  tableId = input.required<number | undefined>();
  teamColor = input<string>();

  constructor(private _dkMqttClientService: DkMqttClientService) {}

  registerPlayer() {
    const randomId = self.crypto.randomUUID();
    this._dkMqttClientService.registerPlayer(
      randomId,
      `${this.tableId()}`,
      this.teamColor() === 'white' ? TeamColor.WHITE : TeamColor.BLACK,
    );
  }
}
