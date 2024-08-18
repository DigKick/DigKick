import { ApplicationProperties } from '../../util/properties/applicationProperties.ts';

export class MqttConfig {
  protocol: string;
  host: string;
  port: number;
  clientId: string;
  connectUrl: string;

  constructor() {
    this.protocol = ApplicationProperties.get().mqtt.protocol;
    this.host = ApplicationProperties.get().mqtt.host;
    this.port = ApplicationProperties.get().mqtt.port;
    this.clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    this.connectUrl = `${this.protocol}://${this.host}:${this.port}`;
  }
}
