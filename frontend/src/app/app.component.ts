import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent, ThemeToggleButtonComponent } from '@dig-kick/ui';
import { ThemeService } from '@dig-kick/services';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    ThemeToggleButtonComponent,
    CommonModule,
  ],
  providers: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dig-kick-fe';

  constructor(private themeService: ThemeService) {
    document.body.classList.add('data-theme', this.themeService.themeSignal());
  }
}
