import {Game} from "../../../models/game";
import {ScoreChange} from "../../../models/team";

export enum GameEventType {

  _SCORE = "SCORE",
  _INCREASE = "INCREASE",
  _DECREASE = "DECREASE",
  _HOME = "HOME",
  _GUEST = "GUEST",

  HOME_SCORE_INCREASE = `${_HOME}.${_SCORE}.${_INCREASE}`,
  HOME_SCORE_DECREASE = `${_HOME}.${_SCORE}.${_DECREASE}`,
  GUEST_SCORE_INCREASE = `${_GUEST}.${_SCORE}.${_INCREASE}`,
  GUEST_SCORE_DECREASE = `${_GUEST}.${_SCORE}.${_DECREASE}`,

}

export const gameEventMapper = (event: GameEventType, game: Game) => {
  switch (event) {
    case GameEventType.HOME_SCORE_INCREASE:
      game.updateHomeTeamScore(ScoreChange.INCREASE);
      break;
    case GameEventType.HOME_SCORE_DECREASE:
      game.updateHomeTeamScore(ScoreChange.DECREASE);
      break;
    case GameEventType.GUEST_SCORE_INCREASE:
      game.updateGuestTeamScore(ScoreChange.INCREASE);
      break;
    case GameEventType.GUEST_SCORE_DECREASE:
      game.updateGuestTeamScore(ScoreChange.DECREASE);
      break;
    default:
      throw new Error(`Event '${event}' is not mapped to any function.`)
  }
}
