import { Component } from '@angular/core';
import { ThemeService } from '@dig-kick/services';

@Component({
  selector: 'lib-theme-toggle-button',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle-button.component.html',
  styleUrl: './theme-toggle-button.component.css',
})
export class ThemeToggleButtonComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
