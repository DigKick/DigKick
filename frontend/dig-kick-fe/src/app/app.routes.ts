import { Route } from '@angular/router';
import { GameViewComponent } from './feature/game-view/game-view.component';
import { ScoreViewComponent } from './feature/score-view/score-view.component';
import { TableViewComponent } from './feature/table-view/table-view.component';

export const appRoutes: Route[] = [
    {path: '', component: TableViewComponent},
    {path: 'game', component: GameViewComponent},
    {path: 'score', component: ScoreViewComponent}
];
