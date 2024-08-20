import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { Table } from '@dig-kick/models';

export const TableStore = signalStore(
  { providedIn: 'root' },
  withEntities<Table>(),

  withMethods((store) => ({
    setTables(tables: Table[]): void {
      patchState(store, setEntities(tables));
    },
  })),
);
