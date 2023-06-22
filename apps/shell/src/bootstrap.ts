import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { setRemoteUrlResolver } from '@nx/angular/mf';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

setRemoteUrlResolver((name) => {
  return (<Record<string, string>>environment.remotes)[name];
});


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
