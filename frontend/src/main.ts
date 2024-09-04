import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Environment, EnvironmentParser } from '@dig-kick/models';

fetch('/assets/config.json').then(async (response: Response) => {
  const config = await response.json();
  const parsed = EnvironmentParser.safeParse(config);

  if (parsed.success) {
    const environment: Environment = parsed.data;
    bootstrapApplication(AppComponent, appConfig(environment)).catch((err) =>
      // eslint-disable-next-line no-console
      console.error(err),
    );
  } else {
    alert(`${parsed.error}`);
  }
});
