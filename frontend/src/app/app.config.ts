import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { ENVIRONMENT, Environment } from '@dig-kick/models';

export const appConfig: (environment: Environment) => ApplicationConfig = (
  environment: Environment,
) => {
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.broker.hostname,
    port: environment.broker.port,
    path: environment.broker.path,
    clientId: environment.broker.clientId,
    protocol: environment.broker.protocol,
  };

  return {
    providers: [
      provideRouter(appRoutes, withComponentInputBinding()),
      importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS)),
      { provide: ENVIRONMENT, useValue: environment },
    ],
  };
};
