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
