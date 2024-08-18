import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDisplayComponent } from './table-display/table-display.component';
import { TableService } from './table.service';

@Component({
  selector: 'lib-table-view',
  standalone: true,
  imports: [TableDisplayComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  constructor(public tableService: TableService) {}
}
