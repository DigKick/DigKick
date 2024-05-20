import { Injectable, signal } from '@angular/core';

@Injectable()
export class ScoreService {

  whiteScoreSignal = signal<number>(0);
  blackScoreSignal = signal<number>(0);
  
  constructor() { }
}
