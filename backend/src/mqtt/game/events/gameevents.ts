import {Game} from "../../../models/game";
import {ScoreChange} from "../../../models/team";

export enum GameEventType {

  _SCORE = "SCORE",
  _INCREASE = "INCREASE",
  _DECREASE = "DECREASE",
  _HOME = "HOME",
  _GUEST = "GUEST",
  _CHANGE = "CHANGE",

  SCORE_CHANGE = `${_SCORE}.${_CHANGE}`,

  HOME_SCORE_CHANGE = `${_HOME}.${SCORE_CHANGE}`,
  GUEST_SCORE_CHANGE = `${_GUEST}.${SCORE_CHANGE}`,

  SCORE_INCREASE = `${_SCORE}.${_INCREASE}`,
  SCORE_DECREASE = `${_SCORE}.${_DECREASE}`,

  HOME_SCORE_INCREASE = `${_HOME}.${SCORE_INCREASE}`,
  HOME_SCORE_DECREASE = `${_HOME}.${SCORE_DECREASE}`,
  GUEST_SCORE_INCREASE = `${_GUEST}.${SCORE_INCREASE}`,
  GUEST_SCORE_DECREASE = `${_GUEST}.${SCORE_DECREASE}`,

  _WINNER = "WINNER",

  WINNER_CHANGE = `${_CHANGE}.${_WINNER}`
}

export const gameEventMapper = (event: GameEventType, game: Game) => {
  const prevGame: Game = structuredClone(game)
  let triggeredEvents = [event]

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

  if (event.includes(GameEventType.SCORE_DECREASE) || event.includes(GameEventType.SCORE_INCREASE)) {
    triggeredEvents.push(GameEventType.SCORE_CHANGE)

    if (event.includes(GameEventType._HOME)) {
      triggeredEvents.push(GameEventType.HOME_SCORE_CHANGE)
    } else {
      triggeredEvents.push(GameEventType.GUEST_SCORE_CHANGE)
    }
  }

  if (prevGame.winnerTeam !== game.winnerTeam) {
    triggeredEvents.push(GameEventType.WINNER_CHANGE)
  }

  return triggeredEvents
}
