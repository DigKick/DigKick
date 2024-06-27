export class MqttConfig {
  protocol: string;
  host: string;
  port: number;
  clientId: string;
  connectUrl: string;

  constructor() {
    this.protocol = "mqtt";
    this.host = String(process.env.MQTT_HOST);
    this.port = 1883;
    this.clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    this.connectUrl = `${this.protocol}://${this.host}:${this.port}`;
  }
}
