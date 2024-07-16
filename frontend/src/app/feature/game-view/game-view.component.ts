import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable, take} from 'rxjs';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { GameService } from 'src/app/core/services/game.service';
import { TeamColor } from 'src/app/core/static/models/team.model';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DkMqttClientService, GameService],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css'
})
export class GameViewComponent implements OnInit {

  whiteColor: string = TeamColor.WHITE;
  blackColor: string = TeamColor.BLACK;

  tableId!: string | null;

  showWhiteRenameSubmitButton = false;
  showBlackRenameSubmitButton = false;

  newPlayerNameBlack = ""
  newPlayerNameWhite = ""

  constructor(private mqttClient: DkMqttClientService, private route: ActivatedRoute, public gameService: GameService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      this.tableId = params.get('tableId');
      if (this.tableId) {
        this.gameService.setId(this.tableId);
      }
    });
  }

  toggleChangeNameSubmitButton(color: string): void {
    if (color === TeamColor.WHITE) {
      this.showWhiteRenameSubmitButton = true;
    } else {
      this.showBlackRenameSubmitButton = true;
    }
  }

  submit(color: string) {
    this.mqttClient.doPublish(`/table/${this.tableId}/game/team/${color}/changename`, 0,
      `{"newName": "${color === TeamColor.WHITE ? this.newPlayerNameWhite : this.newPlayerNameBlack}"}`);
    this.showWhiteRenameSubmitButton = false;
    this.showBlackRenameSubmitButton = false;

    this.newPlayerNameWhite = ""
    this.newPlayerNameBlack = ""
  }

}
