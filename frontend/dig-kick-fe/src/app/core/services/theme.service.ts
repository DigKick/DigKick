import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'night';
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
    this.currentTheme = this.currentTheme === 'night' ? 'retro' : 'night';
    this.themeSignal.set(this.currentTheme)
    document.documentElement.setAttribute('data-theme', this.themeSignal());
  }
}