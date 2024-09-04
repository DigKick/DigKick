import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreChangeComponent } from './score-change.component';
import { DkMqttClientService } from '@dig-kick/services';

describe('ScoreChangeComponent', () => {
  let component: ScoreChangeComponent;
  let fixture: ComponentFixture<ScoreChangeComponent>;

  const mqttClientMock: Partial<DkMqttClientService> = {
    doPublish: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreChangeComponent],
      providers: [
        {
          provide: DkMqttClientService,
          useValue: mqttClientMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
