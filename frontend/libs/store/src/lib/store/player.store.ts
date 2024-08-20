import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { Player } from '@dig-kick/models';

export const PlayerStore = signalStore(
  { providedIn: 'root' },
  withEntities<Player>(),

  withMethods((store) => ({
    setPlayers(players: Player[]): void {
      patchState(store, setEntities(players));
    },
  })),
);
