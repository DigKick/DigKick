import { Component, Input, OnInit, Signal } from '@angular/core';
import { Table } from 'src/app/core/static/models/table.model';
import { TableDisplayComponent } from './components/table-display/table-display.component';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/core/static/models/team.model';
import { Game } from 'src/app/core/static/models/game.model';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [TableDisplayComponent, CommonModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent implements OnInit {

  tableIds$: Observable<String[]>;
  tablesSignal: Signal<String[]>;

  constructor(private mqttClient: DkMqttClientService) {
    this.tableIds$ = mqttClient.activeTableIds.asObservable();
    this.tablesSignal = mqttClient.signalTableIds;

  }

  ngOnInit(): void {
    this.mqttClient.activeTableIds
  }

}
