import { Injectable } from '@angular/core';
import { IMqttMessage, IPublishOptions, MqttService } from 'ngx-mqtt';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DkMqttClientService {
  private topics: { [topic: string]: Subject<string> } = {};

  constructor(private _mqttService: MqttService) {}

  subscribe(topic: string): Observable<string> {
    if (!this.topics[topic]) {
      this.topics[topic] = new Subject<string>();
      this._mqttService.observe(topic).subscribe((message: IMqttMessage) => {
        this.topics[topic].next(message.payload.toString());
      });
    }
    this._mqttService.observe(topic);
    return this.topics[topic].asObservable();
  }

  doPublish(topic: string, qos: unknown, payload: string) {
    this._mqttService?.unsafePublish(topic, payload, qos as IPublishOptions);
  }
}
