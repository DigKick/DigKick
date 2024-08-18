import { Route } from '@angular/router';

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
