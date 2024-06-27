import { Component, Input, OnInit, Signal } from '@angular/core';
import { TableDisplayComponent } from './components/table-display/table-display.component';
import { CommonModule } from '@angular/common';
import { DkMqttClientService } from 'src/app/core/services/dk-mqtt-client.service';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [TableDisplayComponent, CommonModule],
  providers: [DkMqttClientService],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {

  tablesSignal: Signal<String[]>;

  constructor(private mqttClient: DkMqttClientService) {
    this.tablesSignal = mqttClient.signalTableNames;
  }

}
