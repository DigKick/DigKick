import { Injectable, signal } from '@angular/core';
import { Theme } from '../static/models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = Theme.NIGHT;
  themeSignal = signal<string>(this.currentTheme);

  constructor() {}

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    this.themeSignal.set(this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme =
      this.currentTheme === Theme.NIGHT ? Theme.RETRO : Theme.NIGHT;
    this.themeSignal.set(this.currentTheme);
    document.documentElement.setAttribute('data-theme', this.themeSignal());
  }
}
