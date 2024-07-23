import { Injectable, signal } from '@angular/core';
import {
  IMqttMessage,
  IMqttServiceOptions,
  IPublishOptions,
  MqttService,
} from 'ngx-mqtt';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DkMqttClientService {
  private curSubscription: Subscription | undefined;

  connection = {
    hostname: environment.broker_hostname,
    port: environment.broker_port,
    path: environment.broker_path,
    clean: true, // Retain session
    connectTimeout: 4000, // Timeout period
    reconnectPeriod: 4000, // Reconnect period
    // Authentication information
    clientId: environment.broker_clientId,
    username: environment.broker_username,
    password: environment.broker_password,
    protocol: 'ws',
  };

  private topics: { [topic: string]: Subject<string> } = {};
  signalTableNames = signal<string[]>([]);

  constructor(private _mqttService: MqttService) {
    this.createConnection();
    this._mqttService.observe('/tables');
  }

  // Create a connection
  createConnection() {
    try {
      this._mqttService.connect(this.connection as IMqttServiceOptions);
    } catch (error) {
      console.log('mqtt.connect error', error);
    }
    this._mqttService.onConnect.subscribe(() => {
      console.log('Connection succeeded!');
    });
    this._mqttService.onError.subscribe((error: any) => {
      console.log('Connection failed', error);
    });
    this._mqttService.onMessage.subscribe((packet: any) => {
      if (packet.topic === '/tables') {
        try {
          const names = JSON.parse(packet.payload.toString()).names;
          this.signalTableNames.set(names);
        } catch (e) {
          console.log(e);
        }
      }
      console.log(
        `Received message ${packet.payload.toString()} from topic ${
          packet.topic
        }`,
      );
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

  doPublish(topic: string, qos: any, payload: string) {
    this._mqttService?.unsafePublish(topic, payload, qos as IPublishOptions);
  }
}
