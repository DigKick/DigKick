import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavbarComponent, ThemeToggleButtonComponent} from '@dig-kick/ui';
import {ThemeService} from '@dig-kick/services';
import {Theme} from "@dig-kick/models";

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
  constructor(private themeService: ThemeService) {
    this.themeService.theme = Theme.DK_DARK
  }
}
