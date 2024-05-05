import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'dark';
  private currentThemeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('dark');
  public currentTheme$: Observable<string> = this.currentThemeSubject.asObservable();

  constructor() {}

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  toggleTheme(): void {
    const newTheme = this.currentThemeSubject.value === 'dark' ? 'retro' : 'dark';
    this.currentThemeSubject.next(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}