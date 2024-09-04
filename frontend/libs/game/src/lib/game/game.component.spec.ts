import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { TeamStubComponent } from '../team/team.component.stub';
import { DkMqttClientService } from '@dig-kick/services';
import { TeamSwapStubComponent } from './team-swap/team-swap.component.stub';
import { GameScoreStubComponent } from './game-score/game-score.component.stub';
import { CommonModule } from '@angular/common';
import { Environment, ENVIRONMENT } from '@dig-kick/models';

describe('GameViewComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  const mqttClientMock: Partial<DkMqttClientService> = {
    doPublish: jest.fn(),
  };

  const envMock: Environment = {
    debug: false,
    broker: {
      hostname: '',
      port: 80,
      path: '',
      protocol: 'ws',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        GameComponent,
        TeamStubComponent,
        TeamSwapStubComponent,
        GameScoreStubComponent,
      ],
      providers: [
        {
          provide: DkMqttClientService,
          useValue: mqttClientMock,
        },
        {
          provide: ENVIRONMENT,
          useValue: envMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
