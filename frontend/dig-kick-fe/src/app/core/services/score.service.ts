import { Injectable, signal } from '@angular/core';
import { DkMqttClientService } from './dk-mqtt-client.service';
import { Observable } from 'rxjs';

@Injectable()
export class ScoreService {

  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);
 
  constructor(private mqttClient: DkMqttClientService) {
    
   }
}
