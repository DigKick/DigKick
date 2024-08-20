import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDisplayComponent } from './table-display/table-display.component';
import { TableStore } from '@dig-kick/store';
import { Table } from '@dig-kick/models';

@Component({
  selector: 'lib-table-view',
  standalone: true,
  imports: [TableDisplayComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  readonly tableStore = inject(TableStore);

  tables: Signal<Table[]> = this.tableStore.entities;
}
