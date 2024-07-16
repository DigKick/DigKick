import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { ScoreService } from 'src/app/core/services/score.service';

@Component({
  selector: 'app-score-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-view.component.html',
  styleUrl: './score-view.component.css'
})
export class ScoreViewComponent {

  constructor(protected scoreService: ScoreService) { }

}
