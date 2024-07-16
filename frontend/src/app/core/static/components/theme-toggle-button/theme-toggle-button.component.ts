import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from '../../models/theme.model';

@Component({
  selector: 'app-theme-toggle-button',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle-button.component.html',
  styleUrl: './theme-toggle-button.component.css',
})
export class ThemeToggleButtonComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.themeSignal.set(
      this.themeService.themeSignal() === Theme.DIGKICKDARK
        ? Theme.DIGKICKLIGHT
        : Theme.DIGKICKDARK
    );
  }
}
