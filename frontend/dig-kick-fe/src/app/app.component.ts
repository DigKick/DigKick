import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './core/static/components/navbar/navbar.component';
import { GameViewComponent } from './feature/game-view/game-view.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, GameViewComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dig-kick-fe';
}
