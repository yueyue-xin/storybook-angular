import { Component } from '@angular/core';
import { ComplexDataGridComponent } from '@public-ui/components';

@Component({
  selector: 'app-new-data',
  standalone: true,
  imports: [ComplexDataGridComponent],
  template: `
    <div class="content-container">
      <lib-complex-data-grid [pageSize]="10"></lib-complex-data-grid>
    </div>
  `,
  styles: [`
    .content-container {
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class NewDataComponent {}