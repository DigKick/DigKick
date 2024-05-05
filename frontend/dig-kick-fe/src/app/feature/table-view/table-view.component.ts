import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/core/static/models/table.model';
import { TableDisplayComponent } from './components/table-display/table-display.component';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/core/static/models/team.model';
import { Game } from 'src/app/core/static/models/game.model';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [TableDisplayComponent, CommonModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent implements OnInit {

  data: Table[] = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' }
  ];
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

  constructor() {

  }

  ngOnInit(): void {
    
  }

}
