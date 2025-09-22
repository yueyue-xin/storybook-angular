import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ClarityIcons, vmBugIcon, userIcon, cogIcon } from '@cds/core/icon';

ClarityIcons.addIcons(vmBugIcon, userIcon, cogIcon);

document.body.setAttribute('cds-theme', 'light');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
