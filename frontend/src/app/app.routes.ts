import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dig-kick/table').then((m) => m.TableComponent),
  },
  {
    path: 'game/:tableId',
    loadComponent: () => import('@dig-kick/game').then((m) => m.GameComponent),
  },
  {
    path: 'score',
    loadComponent: () =>
      import('@dig-kick/score').then((m) => m.ScoreComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
