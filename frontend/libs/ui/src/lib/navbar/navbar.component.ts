import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggleButtonComponent } from '../theme-toggle-button/theme-toggle-button.component';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [RouterModule, ThemeToggleButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
