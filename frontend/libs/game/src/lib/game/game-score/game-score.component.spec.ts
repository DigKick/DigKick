import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameScoreComponent } from './game-score.component';
import { CommonModule } from '@angular/common';

describe('GameScoreComponentTest', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
