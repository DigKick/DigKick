import type {EventMapper} from "../../abstract/eventMapper";
import {HardwareEventType} from "./hardwareEvent";
import {SoccerTableHandler} from "../../soccerTable/handler/soccerTableHandler";
import {ScoreChange, TeamColor} from "../../../models/team";
import {DkMqttClient} from "../../client/client";
import {SoccerTableEventType} from "../../soccerTable/events/soccerTableEventType";
import {GameEventType} from "../../game/events/gameEvent";
import {BaseTopicFactory} from "../../util/baseTopicFactory";
import {LedUpdatePayload} from "../payloads/ledUpdate";

export class HardwareEventMapper implements EventMapper<HardwareEventType> {
  private _soccerTableHandler: SoccerTableHandler;
  private readonly _teamColor: TeamColor;

  constructor(soccerTableHandler: SoccerTableHandler, teamColor: TeamColor) {
    this._soccerTableHandler = soccerTableHandler;
    this._teamColor = teamColor;
  }

  map(event: HardwareEventType) {
    const triggeredEvents = new Set<HardwareEventType>([event]);
    const dkMqttClient: DkMqttClient = DkMqttClient.getInstance();

    switch (HardwareEventType[event] as HardwareEventType) {
      case HardwareEventType.BUTTON_0_LOW:
        this._soccerTableHandler.triggerEvent(SoccerTableEventType.FINISH_GAME);
        this._soccerTableHandler.triggerEvent(SoccerTableEventType.NEW_GAME);
        break;

      case HardwareEventType.BUTTON_1_LOW:
        this._teamScoreChange(ScoreChange.INCREASE);
        break;

      case HardwareEventType.BUTTON_2_LOW:
        this._teamScoreChange(ScoreChange.DECREASE);
        break;

      case HardwareEventType.LIGHTBARRIER_0_LOW:
        this._teamScoreChange(ScoreChange.INCREASE);
        break;
      case HardwareEventType.LIGHTBARRIER_1_LOW:
        this._teamScoreChange(ScoreChange.INCREASE);
        break;

      default:
        break;
    }

    dkMqttClient.publishWithRetain(
      BaseTopicFactory.getBaseTopic(this._soccerTableHandler.subject) +
      "/debug",
      `{ "lastEvents": "${Array.from(triggeredEvents).join(", ")}" }`,
    );
    this._updateLeds();

    return triggeredEvents;
  }

  private _updateLeds() {
    const dkMqttClient: DkMqttClient = DkMqttClient.getInstance();
    dkMqttClient.publish(
      BaseTopicFactory.getLedUpdateTopic(
        this._soccerTableHandler.subject,
        this._teamColor,
      ),
      JSON.stringify(
        new LedUpdatePayload(
          Array.from(
            {
              length:
                this._soccerTableHandler.subject.game.getTeamByColor(
                  this._teamColor,
                ).score * 2,
            },
            () => {
              return "0x236932";
            },
          ),
          "",
        ).toJSON(),
      ),
    );
  }

  private _teamScoreChange(change: ScoreChange) {
    const eventMap = {
      [TeamColor.WHITE]: {
        [ScoreChange.INCREASE]: GameEventType.WHITE_SCORE_INCREASE,
        [ScoreChange.DECREASE]: GameEventType.WHITE_SCORE_DECREASE,
      },
      [TeamColor.BLACK]: {
        [ScoreChange.INCREASE]: GameEventType.BLACK_SCORE_INCREASE,
        [ScoreChange.DECREASE]: GameEventType.BLACK_SCORE_DECREASE,
      },
    };

    const eventType = eventMap[this._teamColor]?.[change];
    if (eventType) {
      this._soccerTableHandler.gameHandler.triggerEvent(eventType);
    }
  }
}
