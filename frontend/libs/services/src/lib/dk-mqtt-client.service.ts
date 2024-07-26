import { effect, Injectable, signal } from '@angular/core';
import { IMqttMessage, IPublishOptions, MqttService } from 'ngx-mqtt';
import { Observable, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DkMqttClientService {
  message = toSignal<IMqttMessage>(this._mqttService.observe('tables'));

  private topics: { [topic: string]: Subject<string> } = {};
  signalTableNames = signal<string[]>([]);

  constructor(private _mqttService: MqttService) {
    effect(() => {
      const message = this.message();

      if (message) {
        try {
          const names = JSON.parse(message.payload.toString()).names;
          this.signalTableNames.set(names);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

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
