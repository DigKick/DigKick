import type {EventMapper} from "../../global/eventMapper";
import {SensorEventType} from "./sensorEvent.ts";
import {TableHandler} from "../../table/handler/tableHandler.ts";
import {ScoreChange, TeamColor} from "../../../models/team";
import {DkMqttClient} from "../../client/client";
import {TableEventType} from "../../table/events/tableEventType.ts";
import {GameEventType} from "../../game/events/gameEvent";
import {BaseTopicFactory} from "../../util/baseTopicFactory";
import {LedUpdatePayload} from "../payloads/ledUpdate";

export class SensorEventMapper implements EventMapper<SensorEventType> {
  private _tableHandler: TableHandler;
  private readonly _teamColor: TeamColor;

  constructor(soccerTableHandler: TableHandler, teamColor: TeamColor) {
    this._tableHandler = soccerTableHandler;
    this._teamColor = teamColor;
  }

  map(event: SensorEventType, topic: string, payload: any) {
    const triggeredEvents = new Set<SensorEventType>([event]);
    const dkMqttClient: DkMqttClient = DkMqttClient.getInstance();

    const teamColorsLedUpdates: TeamColor[] = []

    switch (event) {
      case SensorEventType.BUTTON_0_LOW:
        this._tableHandler.triggerEvent(TableEventType.FINISH_GAME, topic, payload);
        teamColorsLedUpdates.push(this._teamColor)
        break;

      case SensorEventType.BUTTON_1_LOW:
        this._teamScoreChange(ScoreChange.INCREASE, topic, payload);
        teamColorsLedUpdates.push(this._teamColor)
        break;

      case SensorEventType.BUTTON_2_LOW:
        this._teamScoreChange(ScoreChange.DECREASE, topic, payload);
        teamColorsLedUpdates.push(this._teamColor)
        break;

      case SensorEventType.LIGHT_BARRIER_0_HIGH:
        this._teamScoreChange(ScoreChange.INCREASE, topic, payload);
        if (this._teamColor == TeamColor.WHITE) {
          teamColorsLedUpdates.push(TeamColor.BLACK)
        } else {
          teamColorsLedUpdates.push(TeamColor.WHITE)
        }

        break;
      case SensorEventType.LIGHT_BARRIER_1_LOW:
        this._teamScoreChange(ScoreChange.INCREASE, topic, payload);
        if (this._teamColor == TeamColor.WHITE) {
          teamColorsLedUpdates.push(TeamColor.BLACK)
        } else {
          teamColorsLedUpdates.push(TeamColor.WHITE)
        }
        break;

      default:
        break;
    }

    dkMqttClient.publishWithRetain(
      BaseTopicFactory.getBaseTopic(this._tableHandler.subject) +
      "/debug",
      `{ "lastEvents": "${Array.from(triggeredEvents).join(", ")}" }`,
    );

    new Set(teamColorsLedUpdates).forEach((teamColor) => {
      this._updateLeds(teamColor);
    })


    return triggeredEvents;
  }

  private _updateLeds(teamColor: TeamColor) {
    const dkMqttClient: DkMqttClient = DkMqttClient.getInstance();
    dkMqttClient.publish(
      BaseTopicFactory.getLedUpdateTopic(
        this._tableHandler.subject,
        teamColor,
      ),
      JSON.stringify(
        new LedUpdatePayload(
          Array.from(
            {
              length:
                this._tableHandler.subject.game.getTeamByColor(
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

  private _teamScoreChange(change: ScoreChange, topic: string, payload: any) {
    const eventCombiner = {
      [TeamColor.WHITE]: {
        [ScoreChange.INCREASE]: GameEventType.WHITE_SCORE_INCREASE,
        [ScoreChange.DECREASE]: GameEventType.WHITE_SCORE_DECREASE,
      },
      [TeamColor.BLACK]: {
        [ScoreChange.INCREASE]: GameEventType.BLACK_SCORE_INCREASE,
        [ScoreChange.DECREASE]: GameEventType.BLACK_SCORE_DECREASE,
      },
    };

    const eventType = eventCombiner[this._teamColor]?.[change];
    if (eventType) {
      this._tableHandler.gameHandler.triggerEvent(eventType, topic, payload);
    }
  }
}
