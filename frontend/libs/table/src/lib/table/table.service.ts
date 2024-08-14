import { computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private message = toSignal(this._mqttService.observe('tables'));

  tables = computed(() => {
    const message = this.message();
    if (message) {
      return JSON.parse(message.payload.toString()).names;
    }
    return [];
  });

  constructor(private _mqttService: MqttService) {}
}
