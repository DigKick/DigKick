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
  styleUrl: './table-display.component.css',
})
export class TableDisplayComponent implements OnInit {
  random: number = 1;

  @Input() tableName!: String;

  constructor(
    private mqttClient: DkMqttClientService,
    public gameService: GameService,
  ) {}

  ngOnInit(): void {
    if (this.tableName) {
      this.gameService.setId(this.tableName);
    }
    this.random = this.randomImagePath();
  }

  randomImagePath(): number {
    const imageIndex = Math.floor(Math.random() * 4) + 1;
    return imageIndex;
  }
}
