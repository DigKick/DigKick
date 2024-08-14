import { MqttObjectUpdater } from './mqttObjectUpdater';
import type { MqttObjectUpdaterConfig } from './mqttObjectUpdaterConfig';

export class MqttObjectUpdaterFactory {
  private static mqttObjectUpdaters: Map<any, MqttObjectUpdater<any>> = new Map<
    any,
    MqttObjectUpdater<any>
  >();

  public static getMqttObjectUpdater(
    obj: any,
    config?: MqttObjectUpdaterConfig,
  ): MqttObjectUpdater<any> {
    let mqttObjectUpdater = this.mqttObjectUpdaters.get(obj);

    if (!mqttObjectUpdater) {
      mqttObjectUpdater = new MqttObjectUpdater(obj, config);
      this.mqttObjectUpdaters.set(obj, mqttObjectUpdater);
    }

    return mqttObjectUpdater;
  }
}
