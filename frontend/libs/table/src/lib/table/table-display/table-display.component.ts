import { Component, computed, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameStore } from '@dig-kick/store';
import { Game } from '@dig-kick/models';

@Component({
  selector: 'lib-table-display',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.css',
})
export class TableDisplayComponent {
  random = Math.floor(Math.random() * 4) + 1;

  tableId = input<string>();

  readonly gameStore = inject(GameStore);

  game = computed<Game | undefined>(() => {
    const tableId = this.tableId();
    if (tableId) {
      return this.gameStore.entityMap()[tableId];
    }
    return undefined;
  });
}
