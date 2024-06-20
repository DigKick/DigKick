import { Injectable, effect, signal } from '@angular/core';
import { DkMqttClientService } from './dk-mqtt-client.service';
import { Observable } from 'rxjs';
import { Player } from '../static/models/player.model';

@Injectable({ providedIn: 'root' })
export class ScoreService {


    tableId = signal<String>('');
    message$!: Observable<String>;
    players$ = signal<Player[]>([]);

    constructor(private mqttClient: DkMqttClientService) {
        effect(() => {
            this.message$ = this.mqttClient.subscribe(`/api/player/all`)
            this.message$.subscribe((message: String) => {
                try {
                    this.players$.set(JSON.parse(message.toString()));
                } catch (e) {
                    console.log(e);
                    console.log('GAME CATCH')
                }
            })
        })
    }
}