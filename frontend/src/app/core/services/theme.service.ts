import { Injectable, signal } from '@angular/core';
import { Theme } from '../static/models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = Theme.DIGKICKDARK;
  themeSignal = signal<string>(this.currentTheme);

  constructor() {
    this.themeSignal.set(this.currentTheme);
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    this.themeSignal.set(this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === Theme.DIGKICKDARK ? Theme.DIGKICKLIGHT : Theme.DIGKICKDARK;
    this.themeSignal.set(this.currentTheme)
    document.documentElement.setAttribute('data-theme', this.themeSignal());
  }
}