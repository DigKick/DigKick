import { Injectable } from '@angular/core';
import { Theme } from '@dig-kick/models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme: Theme = Theme.DK_DARK;

  get theme(): Theme {
    return this._theme;
  }

  set theme(theme: Theme) {
    this._theme = theme;
    document.documentElement.setAttribute('data-theme', theme.toString());
  }

  toggleTheme(): void {
    this.theme = this.theme === Theme.DK_DARK ? Theme.DK_LIGHT : Theme.DK_DARK;
  }
}
