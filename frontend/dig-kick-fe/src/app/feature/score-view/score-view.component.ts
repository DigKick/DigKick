import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { ScoreService } from 'src/app/core/services/score.service';
import { Player } from 'src/app/core/static/models/player.model';

@Component({
  selector: 'app-score-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-view.component.html',
  styleUrl: './score-view.component.css'
})
export class ScoreViewComponent {

  data: Player[];



  constructor(private mqttClient: DkMqttClientService, private scoreService: ScoreService) {
    this.data = scoreService.players$()
    this.data.sort((a, b) => b.elo - a.elo);
  }

}
