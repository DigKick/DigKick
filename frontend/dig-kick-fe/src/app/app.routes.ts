import { Route } from '@angular/router';
import { GameViewComponent } from './feature/game-view/game-view.component';
import { ScoreViewComponent } from './feature/score-view/score-view.component';
import { TableViewComponent } from './feature/table-view/table-view.component';
import { StatsViewComponent } from './feature/stats-view/stats-view.component';

export const appRoutes: Route[] = [
    {path: '', component: TableViewComponent},
    {path: 'game/:id', component: GameViewComponent},
    {path: 'score', component: ScoreViewComponent},
    {path: 'stats', component: StatsViewComponent},
];
