import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DkMqttClientService, GameService } from '@dig-kick/services';

@Component({
  selector: 'lib-table-display',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [DkMqttClientService, GameService],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.css',
})
export class TableDisplayComponent implements OnInit {
  random = 1;

  @Input() tableName!: string;

  constructor(public gameService: GameService) {}

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
