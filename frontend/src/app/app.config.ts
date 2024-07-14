import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { MQTT_SERVICE_OPTIONS, MqttModule } from 'ngx-mqtt';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS))],
};
