import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Player } from 'src/app/core/static/models/player.model';

@Component({
  selector: 'app-score-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-view.component.html',
  styleUrl: './score-view.component.css'
})
export class ScoreViewComponent {

  data: Player[] = [];

  
  constructor() {
    const player1 = {
      id: String(1),
      firstname: ('player 1'),
      lastname: ('pl'),
      score: 20,
    }
  
    const player2 = {
      id: String(1),
      firstname: ('player 2'),
      lastname: ('pl'),
      score: 30,
    }
    const player3 = {
      id: String(1),
      firstname: ('player 3'),
      lastname: ('pl'),
      score: 31,
    }
    const player4 = {
      id: String(1),
      firstname: ('player 4'),
      lastname: ('pl'),
      score: 40,
    }
    const player5 = {
      id: String(1),
      firstname: ('player 5'),
      lastname: ('pl'),
      score: 50,
    }
    this.data.push(player1, player2, player3, player4, player5);
    this.data.sort((a, b) => b.score - a.score);
  }

}
