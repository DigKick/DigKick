import { Route } from '@angular/router';
import { GameViewComponent } from './feature/game-view/game-view.component';
import { ScoreViewComponent } from './feature/score-view/score-view.component';

export const appRoutes: Route[] = [
    {path: '', component: GameViewComponent},
    {path: 'score', component: ScoreViewComponent}
];
