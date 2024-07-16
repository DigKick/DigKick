import {effect, Injectable, signal} from '@angular/core';
import {DkMqttClientService} from './dk-mqtt-client.service';
import {Observable} from 'rxjs';
import {emptyGame, Game} from '../static/models/game.model';

@Injectable()
export class GameService {

  tableId = signal<string>('');
  game$!: Observable<string>;
  gameSignal = signal<Game>(emptyGame);

  constructor(private mqttClient: DkMqttClientService) {
    effect(() => {
      this.game$ = this.mqttClient.subscribe(`/table/${this.tableId()}/game`)
      this.game$.subscribe((message: string) => {
        try {
          const game: Game = JSON.parse(message.toString());
          this.gameSignal.set(game)
        } catch (e) {
          console.error(e);
        }
      })
    })
  }

  setId(id: string) {
    this.tableId.set(id);
  }

}
