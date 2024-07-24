import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DkMqttClientService } from '@dig-kick/services';
import { TableDisplayComponent } from './table-display/table-display.component';

@Component({
  selector: 'lib-table-view',
  standalone: true,
  imports: [TableDisplayComponent, CommonModule],
  providers: [DkMqttClientService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  tablesSignal: Signal<string[]>;

  constructor(private mqttClient: DkMqttClientService) {
    this.tablesSignal = mqttClient.signalTableNames;
  }
}
