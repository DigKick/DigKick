import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DkMqttClientService } from '@dig-kick/services';
import { Game, TeamColor } from '@dig-kick/models';
import { derivedAsync } from 'ngxtension/derived-async';
import { map } from 'rxjs';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'lib-game-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  whiteColor: string = TeamColor.WHITE;
  blackColor: string = TeamColor.BLACK;

  tableId = input<string>();

  game = derivedAsync<Game>(() =>
    this._mqttService
      .observe(`table/${this.tableId()}/game`)
      .pipe(map((value) => JSON.parse(value.payload.toString()) as Game)),
  );

  renameWhite = false;
  renameBlack = false;

  constructor(
    private mqttClient: DkMqttClientService,
    private _mqttService: MqttService,
  ) {}

  changeName(color: string) {
    if (color === TeamColor.WHITE) {
      this.renameWhite = true;
    } else {
      this.renameBlack = true;
    }
  }

  submit(color: string) {
    const changeNameInputValue: string = (<HTMLInputElement>(
      document.getElementById('input')
    )).value;
    let topic = '';
    if (color === TeamColor.WHITE) {
      const playerOneWhite = this.game()?.teamWhite.playerOne;
      if (playerOneWhite) {
        playerOneWhite.name = changeNameInputValue;
      }
      topic = `/table/${this.tableId}/game/team/${color}/changename`;
      this.renameWhite = false;
    } else {
      const playerOneBlack = this.game()?.teamBlack.playerOne;
      if (playerOneBlack) {
        playerOneBlack.name = changeNameInputValue;
      }
      topic = `/table/${this.tableId}/game/team/${color}/changename`;
      this.renameBlack = false;
    }
    this.mqttClient.doPublish(
      topic,
      0,
      `{"newName": "${changeNameInputValue}"}`,
    );
  }
}
