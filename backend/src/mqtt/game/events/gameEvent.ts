import {TeamColor} from "../../../models/team";
import {BasicTerm} from "../../util/basicTerm.ts";

export enum GameEventType {
  _SCORE = "SCORE",
  _INCREASE = "INCREASE",
  _DECREASE = "DECREASE",
  _CHANGE = "CHANGE",

  SCORE_CHANGE = `${_SCORE}_${_CHANGE}`,

  WHITE_SCORE_CHANGE = `${TeamColor.WHITE}_${SCORE_CHANGE}`,
  BLACK_SCORE_CHANGE = `${TeamColor.BLACK}_${SCORE_CHANGE}`,

  SCORE_INCREASE = `${_SCORE}_${_INCREASE}`,
  SCORE_DECREASE = `${_SCORE}_${_DECREASE}`,

  WHITE_SCORE_INCREASE = `${TeamColor.WHITE}_${SCORE_INCREASE}`,
  WHITE_SCORE_DECREASE = `${TeamColor.WHITE}_${SCORE_DECREASE}`,
  BLACK_SCORE_INCREASE = `${TeamColor.BLACK}_${SCORE_INCREASE}`,
  BLACK_SCORE_DECREASE = `${TeamColor.BLACK}_${SCORE_DECREASE}`,

  _WINNER = "WINNER",

  WINNER_CHANGE = `${_CHANGE}_${_WINNER}`,

  PLAYER_CHANGE = BasicTerm.PLAYER + "_" + _CHANGE,
}
