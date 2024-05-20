import { Component, Input, OnInit, signal , WritableSignal} from '@angular/core';
import { Table } from 'src/app/core/static/models/table.model';
import { TableViewComponent } from '../../table-view.component';
import { RouterModule } from '@angular/router';
import { Team } from 'src/app/core/static/models/team.model';
import { Game } from 'src/app/core/static/models/game.model';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { Observable, catchError, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ScoreService } from 'src/app/core/services/score.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [DkMqttClientService, ScoreService],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.css'
})
export class TableDisplayComponent implements OnInit{

  random: number = 1;

  whiteScore$!: Observable<string>;
  blackScore$!: Observable<String>;
  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);

  team1: Team = {
    color: 'white',
    score: 0
  }
  team2: Team = {
    color: 'black',
    score: 0
  }

  game1: Game = {
    id: String(1),
    teams: [this.team1, this.team2],
    pointsToWin: String(10),
    winner: undefined,
    mode: 'normal'
  }

  @Input() tableId!: String;

  constructor(private mqttClient: DkMqttClientService, public scoreService: ScoreService) {}
  
  ngOnInit(): void {
    this.random = this.randomImagePath();
    console.log(this.tableId)
    console.log(``)
    this.whiteScore$ = this.mqttClient.subscribe(`/table/${this.tableId}/team/white/score`)
    this.whiteScore$.subscribe((message: String) => {
      try {
        this.scoreService.whiteScoreSignal.set(Number(JSON.parse(message.toString()).score));
      } catch(e) {
        console.log(e);
        console.log('WHITE SCORE CATCH')
      }
    })

    this.blackScore$ = this.mqttClient.subscribe(`/table/${this.tableId}/team/black/score`)
    this.blackScore$.subscribe((message: String) => {
      try {
        this.scoreService.blackScoreSignal.set(Number(JSON.parse(message.toString()).score));
      } catch(e) {
        console.log(e);
        console.log('BLACK SCORE CATCH')
      }
    })
  }
  
  randomImagePath(): number {
    const imageIndex = Math.floor(Math.random() * 4) + 1;
    return imageIndex;
  }

}
