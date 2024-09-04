import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerNameChangeComponent } from './player-name-change.component';
import { CommonModule } from '@angular/common';
import { DkMqttClientService } from '@dig-kick/services';

describe('PlayerNameChangeComponentTest', () => {
  let component: PlayerNameChangeComponent;
  let fixture: ComponentFixture<PlayerNameChangeComponent>;

  const mqttClientMock: Partial<DkMqttClientService> = {
    doPublish: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        {
          provide: DkMqttClientService,
          useValue: mqttClientMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerNameChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
