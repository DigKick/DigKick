import { Component } from '@angular/core';
import { Player } from 'src/app/core/static/models/player.model';
import { Team } from 'src/app/core/static/models/team.model';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent {
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;

  white: Team;
  black: Team;

  constructor() {
    this.player1 = {
      id: String(1),
      firstname: 'player',
      lastname: '1',
      score: 345
    }
   this.player2 = {
      id: String(2),
      firstname: 'player',
      lastname: '2',
      score: 217
    }
    this.player3 = {
      id: String(3),
      firstname: 'player',
      lastname: '3',
      score: 313
    }
    this.player4 = {
      id: String(4),
      firstname: 'player',
      lastname: '4',
      score: 123
    }
    this.white = {
      color: 'white',
      score: 8
    }
    this.black = {
      color: 'black',
      score: 6
    }
  }

  
}
