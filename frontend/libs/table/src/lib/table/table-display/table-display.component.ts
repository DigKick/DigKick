import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { derivedAsync } from 'ngxtension/derived-async';
import { MqttService } from 'ngx-mqtt';
import { map } from 'rxjs';
import { Game } from '@dig-kick/models';

@Component({
  selector: 'lib-table-display',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.css',
})
export class TableDisplayComponent {
  random = Math.floor(Math.random() * 4) + 1;

  tableName = input<string>();

  game = derivedAsync<Game>(() =>
    this._mqttService
      .observe(`table/${this.tableName()}/game`)
      .pipe(map((value) => JSON.parse(value.payload.toString()) as Game)),
  );

  constructor(private _mqttService: MqttService) {}
}
