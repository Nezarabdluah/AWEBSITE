import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
    template: `
    <div class="app">
      <app-header></app-header>
      
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      
      <app-footer></app-footer>
    </div>
  `,
    styles: []
})
export class MainLayoutComponent { }
