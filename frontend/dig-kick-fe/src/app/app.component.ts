import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './core/static/components/navbar/navbar.component';
import { GameViewComponent } from './feature/game-view/game-view.component';
import { TableViewComponent } from './feature/table-view/table-view.component';
import { TableDisplayComponent } from './feature/table-view/components/table-display/table-display.component';
import { Observable, Subscription } from 'rxjs';
import { ThemeToggleButtonComponent } from './core/static/components/theme-toggle-button/theme-toggle-button.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, GameViewComponent, TableViewComponent, TableDisplayComponent, ThemeToggleButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})  
  export class AppComponent implements OnInit,OnDestroy{


    
  title = 'dig-kick-fe';
  theme: string = 'dark'

  private themeSubscription: Subscription;
  public currentTheme: string = 'dark';

  constructor(private themeService: ThemeService) {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
      document.body.classList.add('data-theme', this.currentTheme);
    }); 
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
      document.body.classList.add('data-theme', this.currentTheme);
    }); 
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}

