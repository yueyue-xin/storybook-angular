import { Component } from '@angular/core';
import { DataGridComponent } from '@public-ui/components';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [DataGridComponent],
  template: `
    <div class="content-container">
      <h1>Clarity DataGrid Demo</h1>
      <lib-data-grid></lib-data-grid>
    </div>
  `,
  styles: [`
    .content-container {
      padding: 30px;
    }
  `]
})
export class HelloComponent {}