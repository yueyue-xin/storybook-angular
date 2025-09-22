import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityIcons, vmBugIcon } from '@cds/core/icon';
ClarityIcons.addIcons(vmBugIcon);

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-login-app';
}
