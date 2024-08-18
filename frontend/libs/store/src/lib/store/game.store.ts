import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  SelectEntityId,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Game } from '@dig-kick/models';

const selectId: SelectEntityId<Game> = (game) => game.tableId;

export const GameStore = signalStore(
  { providedIn: 'root' },
  withEntities<Game>(),

  withMethods((store) => ({
    setGame(game: Game): void {
      patchState(store, setEntity(game, { selectId }));
    },
  })),
);
