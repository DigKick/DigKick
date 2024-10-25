import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TeamSwapComponent } from './team-swap.component';

describe('TeamSwapComponentTest', () => {
  let component: TeamSwapComponent;
  let fixture: ComponentFixture<TeamSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
