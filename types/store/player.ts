import { SpotifyWebPlayer } from "../../classes";
import { StateAction } from "./root";

export interface PlayerState {
  instance?: SpotifyWebPlayer;
}

export interface PlayerSetAction extends StateAction {
  type: "SET_PLAYER";
  payload: Required<PlayerState>;
}

export type PlayerAction = PlayerSetAction;
