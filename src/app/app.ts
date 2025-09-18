import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityIcons, vmBugIcon, cogIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';

ClarityIcons.addIcons(vmBugIcon, cogIcon);
@Component({
  imports: [RouterModule, ClarityModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
