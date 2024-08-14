import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { TeamStubComponent } from '../team/team.component.stub';
import { DkMqttClientService, GameService } from '@dig-kick/services';
import { Game } from '@dig-kick/models';
import { signal } from '@angular/core';

describe('GameViewComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  const mqttClientMock: Partial<DkMqttClientService> = {
    doPublish: jest.fn(),
  }

  const gameServiceMock: Partial<GameService> = {
    gameSignal: signal({
      teamWhite: {
        playerOne: {}
      },
      teamBlack: {
        playerOne: {}
      }
    } as Game),
    setId: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent, TeamStubComponent],
      providers: [{
        provide: DkMqttClientService,
        useValue: mqttClientMock
      },
  {
    provide: GameService,
    useValue: gameServiceMock
  }]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
