import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrIconModule } from '@clr/angular';

@Component({
  selector: 'app-login-header',
  standalone: true,
  imports: [CommonModule, ClarityModule, ClrIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  template: `
    <div class="login-header">
      <div class="login-logo">
        <cds-icon [shape]="iconShape" [size]="iconSize" />
      </div>
      <h1 class="login-title">{{ title }}</h1>
      <p class="login-subtitle">{{ subtitle }}</p>
    </div>
  `,
  styles: [`
    .login-header {
      text-align: center;
      padding: 40px 30px 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      
      .login-logo {
        margin-bottom: 20px;
        
        cds-icon {
          color: #667eea;
        }
      }
      
      .login-title {
        margin: 0 0 10px;
        font-size: 24px;
        font-weight: 600;
        color: #2c3e50;
      }
      
      .login-subtitle {
        margin: 0;
        color: #7f8c8d;
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .login-header {
        padding: 30px 20px 15px;
        
        .login-title {
          font-size: 20px;
        }
      }
    }
  `]
})
export class LoginHeaderComponent {
  @Input() title = 'Welcome Back';
  @Input() subtitle = 'Please enter your credentials to access the system';
  @Input() iconShape = 'vm-bug';
  @Input() iconSize = '48';
}