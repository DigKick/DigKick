import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'night';
  private currentThemeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('night');
  public currentTheme$: Observable<string> = this.currentThemeSubject.asObservable();

  constructor() { }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  toggleTheme(): void {
    const newTheme = this.currentThemeSubject.value === 'night' ? 'retro' : 'night';
    this.currentThemeSubject.next(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}