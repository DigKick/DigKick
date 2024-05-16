import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  whiteScoreSignal = signal<number>(0);
  
  constructor() { }
}
