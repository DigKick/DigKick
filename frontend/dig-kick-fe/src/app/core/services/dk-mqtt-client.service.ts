import { Injectable, signal } from '@angular/core';
import {
  IMqttMessage,
  IMqttServiceOptions,
  IPublishOptions,
  MqttService,
} from 'ngx-mqtt';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DkMqttClientService {
  private curSubscription: Subscription | undefined;

  connection = {
    hostname: 'localhost',
    port: 8083,
    path: '/mqtt',
    clean: true, // Retain session
    connectTimeout: 4000, // Timeout period
    reconnectPeriod: 4000, // Reconnect period
    // Authentication information
    clientId: 'mqttx_597046f4',
    username: 'emqx_test',
    password: 'emqx_test',
    protocol: 'ws',
  }

  private topics: { [topic: string]: Subject<string> } = {};
  signalTableIds = signal<String[]>([]);

  publish = {
    topic: 'topic/browser',
    qos: 0,
    payload: '{ "msg": "Hello, I am browser." }',
  };


  constructor(private _mqttService: MqttService) {
    this.createConnection();
    this._mqttService.observe('/tables');
  }

  // Create a connection
  createConnection() {
    try {
      this._mqttService.connect(this.connection as IMqttServiceOptions)
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
          const ids = JSON.parse(packet.payload.toString()).ids;
          this.signalTableIds.set(ids);
        }
        catch (e) {
          console.log(e);
        }
      }
      console.log(`Received message ${packet.payload.toString()} from topic ${packet.topic}`)
    })
  }

  subscribe(topic: string): Observable<string> {
    if (!this.topics[topic]) {
      this.topics[topic] = new Subject<string>();
      this._mqttService.observe(topic).subscribe((message: IMqttMessage) => {
        this.topics[topic].next(message.payload.toString());
      })
    }
    this._mqttService.observe(topic);

    return this.topics[topic].asObservable();
  }

  doPublish(topic: string, qos: any, payload: string) {
    console.log(this.publish)
    this._mqttService?.unsafePublish(topic, payload, qos as IPublishOptions)
  }

  /*
  unsubscribe(topic: string): void {
    if (this.topics[topic]) {
      this.client.unsubscribe(topic, (err) => {
        if (!err) {
          this.topics[topic].complete();
          delete this.topics[topic];
        }
      });
    }
  }
  */
}