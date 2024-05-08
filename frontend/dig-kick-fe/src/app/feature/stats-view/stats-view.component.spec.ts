import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsViewComponent } from './stats-view.component';

describe('StatsViewComponent', () => {
  let component: StatsViewComponent;
  let fixture: ComponentFixture<StatsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
