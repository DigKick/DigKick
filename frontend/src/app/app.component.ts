import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './core/static/components/navbar/navbar.component';
import { GameViewComponent } from './feature/game-view/game-view.component';
import { TableViewComponent } from './feature/table-view/table-view.component';
import { TableDisplayComponent } from './feature/table-view/components/table-display/table-display.component';
import { ThemeToggleButtonComponent } from './core/static/components/theme-toggle-button/theme-toggle-button.component';
import { ThemeService } from './core/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    GameViewComponent,
    TableViewComponent,
    TableDisplayComponent,
    ThemeToggleButtonComponent,
    CommonModule,
  ],
  providers: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dig-kick-fe';

  constructor(private themeService: ThemeService) {
    document.body.classList.add('data-theme', this.themeService.themeSignal());
  }
}
