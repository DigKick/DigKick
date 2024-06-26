import type {EventMapper} from "../../global/eventMapper";
import {SensorEventType} from "./sensorEvent.ts";
import {TableHandler} from "../../table/handler/tableHandler.ts";
import {ScoreChange, TeamColor} from "../../../models/team";
import {DkMqttClient} from "../../client/client";
import {TableEventType} from "../../table/events/tableEventType.ts";
import {GameEventType} from "../../game/events/gameEvent";
import {BaseTopicFactory} from "../../util/baseTopicFactory";
import {LedUpdatePayload} from "../payloads/ledUpdate";
import {TopicTool} from "../../util/topicTool.ts";
import {BasicTerm} from "../../util/basicTerm.ts";

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

    switch (event) {
      case SensorEventType.BUTTON_0_LOW:
        this._tableHandler.triggerEvent(TableEventType.FINISH_GAME, topic, payload);
        break;

      case SensorEventType.BUTTON_1_LOW:
        this._teamScoreChange(ScoreChange.INCREASE, topic, payload);
        break;

      case SensorEventType.BUTTON_2_LOW:
        this._teamScoreChange(ScoreChange.DECREASE, topic, payload);
        break;

      case SensorEventType.LIGHT_BARRIER_0_HIGH:
        this._teamScoreChange(ScoreChange.INCREASE, topic, payload);
        break;
      case SensorEventType.LIGHT_BARRIER_1_LOW:
        this._teamScoreChange(ScoreChange.INCREASE, topic, payload);
        break;

      default:
        break;
    }

    dkMqttClient.publishWithRetain(
      BaseTopicFactory.getBaseTopic(this._tableHandler.subject) +
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
        this._tableHandler.subject,
        this._teamColor,
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
    const topicTool = new TopicTool(topic)

    let teamColor: TeamColor = this._teamColor;

    if (topicTool.getSegment(5) == BasicTerm.LIGHT_BARRIER) {
      // Add score to other team if light barrier is triggered.
      if (teamColor == TeamColor.WHITE) {
        teamColor = TeamColor.BLACK;
      } else {
        teamColor = TeamColor.WHITE;
      }
    }

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

    const eventType = eventCombiner[teamColor]?.[change];
    if (eventType) {
      this._tableHandler.gameHandler.triggerEvent(eventType, topic, payload);
    }
  }
}
