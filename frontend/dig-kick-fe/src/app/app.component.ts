import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './core/static/components/navbar/navbar.component';
import { GameViewComponent } from './feature/game-view/game-view.component';
import { TableViewComponent } from './feature/table-view/table-view.component';
import { TableDisplayComponent } from './feature/table-view/components/table-display/table-display.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, GameViewComponent, TableViewComponent, TableDisplayComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})  
  export class AppComponent {

    title = 'dig-kick-fe';
}

