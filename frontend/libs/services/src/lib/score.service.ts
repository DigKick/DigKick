import { Injectable, effect, signal } from '@angular/core';
import { DkMqttClientService } from './dk-mqtt-client.service';
import { Observable } from 'rxjs';
import { Player } from '@dig-kick/models';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  message$!: Observable<string>;
  playersSignal = signal<Player[]>([]);

  constructor(private mqttClient: DkMqttClientService) {
    effect(() => {
      this.message$ = this.mqttClient.subscribe(`/api/player/all`);
      this.message$.subscribe((message: string) => {
        try {
          this.playersSignal.set(JSON.parse(message.toString()));
        } catch (e) {
          console.log(e);
        }
      });
    });
  }
}
