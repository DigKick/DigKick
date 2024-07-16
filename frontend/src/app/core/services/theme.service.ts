import { effect, Injectable, signal } from '@angular/core';
import { Theme } from '../static/models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeSignal = signal<Theme>(Theme.DIGKICKDARK);

  constructor() {
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.themeSignal());
    });
  }
}
