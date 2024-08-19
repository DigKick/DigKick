import {
  DestroyRef,
  effect,
  inject,
  Injectable,
  untracked,
} from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import {
  GameSchema,
  PlayersSchema,
  Table,
  TablesResponseSchema,
  TeamColor,
} from '@dig-kick/models';
import { GameStore, PlayerStore, TableStore } from '@dig-kick/store';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DkMqttClientService {
  private readonly _mqttService: MqttService = inject(MqttService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  readonly tableStore = inject(TableStore);
  readonly gameStore = inject(GameStore);
  readonly playerStore = inject(PlayerStore);

  tablesRaw = toSignal(this._mqttService.observe('tables'));

  scoreRaw = toSignal(this._mqttService.observe(`api/player/all`));

  init() {
    effect(() => {
      const tablesRaw = this.tablesRaw();
      if (tablesRaw) {
        const tables: Table[] = TablesResponseSchema.parse(
          JSON.parse(tablesRaw.payload.toString()),
        ).names.map((t) => ({ id: t }));
        untracked(() => {
          this.tableStore.setTables(tables);
        });
      }
    });

    effect(() => {
      const tables: Table[] = this.tableStore.entities();
      if (tables && tables.length > 0) {
        tables.forEach((table) => {
          this._mqttService
            .observe(`table/${table.id}/game`)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((value) => {
              const game = GameSchema.parse(
                JSON.parse(value.payload.toString()),
              );
              untracked(() => {
                this.gameStore.setGame({ tableId: table.id, ...game });
              });
            });
        });
      }
    });

    effect(() => {
      const scoreRaw = this.scoreRaw();
      if (scoreRaw) {
        const players = PlayersSchema.parse(
          JSON.parse(scoreRaw.payload.toString()),
        );
        untracked(() => {
          this.playerStore.setPlayers(players);
        });
      }
    });
  }

  registerPlayer(serialNumber: string, tableId: string, teamColor: TeamColor) {
    const topic = `table/${tableId}/game/team/${teamColor}/nfc-reader`;
    this._mqttService?.unsafePublish(
      topic,
      JSON.stringify({ serialNumber: serialNumber }),
    );
  }

  doPublish(topic: string, payload: string) {
    this._mqttService?.unsafePublish(topic, payload);
  }
}
