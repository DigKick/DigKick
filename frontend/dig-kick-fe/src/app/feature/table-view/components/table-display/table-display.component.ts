import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/core/static/models/table.model';
import { TableViewComponent } from '../../table-view.component';
import { RouterModule } from '@angular/router';
import { Team } from 'src/app/core/static/models/team.model';
import { Game } from 'src/app/core/static/models/game.model';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.css'
})
export class TableDisplayComponent implements OnInit{

  random: number = 1;

  team1: Team = {
    color: 'white',
    score: String(3)
  }
  team2: Team = {
    color: 'black',
    score: String(7)
  }

  game1: Game = {
    id: String(1),
    teams: [this.team1, this.team2],
    pointsToWin: String(10),
    winner: ''
  }

  @Input() table: any;

  constructor() {
    
  }
  ngOnInit(): void {
    this.random = this.randomImagePath();
  }
  
  randomImagePath(): number {
    const imageIndex = Math.floor(Math.random() * 4) + 1;
    return imageIndex;
  }

}
