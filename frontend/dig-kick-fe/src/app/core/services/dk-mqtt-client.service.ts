import { Injectable, signal } from '@angular/core';
import {
  IMqttMessage,
  IMqttServiceOptions,
  MqttService,
} from 'ngx-mqtt';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Table } from '../static/models/table.model';

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

  public activeTableIds = new BehaviorSubject<String[]>([]);
  private topics: { [topic: string]: Subject<string> } = {};
  signalTableIds = signal<String[]>([]);


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
      if(packet.topic === '/tables') {
        try {
          console.log(JSON.parse(packet.payload.toString()));
          const ids = JSON.parse(packet.payload.toString()).ids;
          console.log(ids);
          this.activeTableIds.next(ids);
          this.signalTableIds.set(ids);
          console.log('signal tIds')
          console.log(this.signalTableIds());
        }
        catch(e) {
          console.log(e);
        }
      }
      console.log(`Received message ${packet.payload.toString()} from topic ${packet.topic}`)
    })
  }

subscribe(topic: string): Observable<string> {
    console.log(topic)
    if (!this.topics[topic]) {
      this.topics[topic] = new Subject<string>();  
    this._mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      console.log(message)
      this.topics[topic].next(message.payload.toString());
    })
    }
    this._mqttService.observe(topic);

    return this.topics[topic].asObservable();
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