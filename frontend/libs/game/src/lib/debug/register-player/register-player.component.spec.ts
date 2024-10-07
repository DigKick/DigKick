import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPlayerComponent } from './register-player.component';
import { DkMqttClientService } from '@dig-kick/services';

describe('ScoreChangeComponent', () => {
  let component: RegisterPlayerComponent;
  let fixture: ComponentFixture<RegisterPlayerComponent>;

  const mqttClientMock: Partial<DkMqttClientService> = {
    doPublish: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPlayerComponent],
      providers: [
        {
          provide: DkMqttClientService,
          useValue: mqttClientMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
