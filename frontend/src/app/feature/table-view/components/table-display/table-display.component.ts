import { Component, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { GameService } from 'src/app/core/services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [DkMqttClientService, GameService],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.css'
})
export class TableDisplayComponent implements OnInit {

  @Input() tableName!: string;

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    if (this.tableName) {
      this.gameService.setId(this.tableName);
    }
  }

  randomImageNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }

}
