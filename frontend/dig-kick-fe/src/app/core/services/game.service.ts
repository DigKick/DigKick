import { Injectable, effect, signal } from '@angular/core';
import { DkMqttClientService } from './dk-mqtt-client.service';
import { Observable } from 'rxjs';

@Injectable()
export class GameService {

  tableId = signal<String>('');
  game$!: Observable<String>;
  whiteScore$!: Observable<String>;
  blackScore$!: Observable<String>;
  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);
  winnerSignal = signal<string>('');
  rankedSignal = signal<string>('');
 
  constructor(private mqttClient: DkMqttClientService) {
    effect(() => {
      this.game$ = this.mqttClient.subscribe(`/table/${this.tableId()}/game`)
      this.game$.subscribe((message: String) => {
        try {
          this.whiteScoreSignal.set(Number(JSON.parse(message.toString()).teamWhite.score));
          this.blackScoreSignal.set(Number(JSON.parse(message.toString()).teamBlack.score));
          //this.winnerSignal.set((JSON.parse(message.toString()).teamWinner.color).toString())
          //this.rankedSignal.set((JSON.parse(message.toString()).gameMode).toString())
        } catch(e) {
          console.log(e);
          console.log('GAME CATCH')
        }
      })
    })
   }

   setId(id: String) {
    this.tableId.set(id);
   }

}
