import { AppState } from "./app";
import { PlayerState } from "./player";
import { UserState } from "./user";

export type StateActionType =
  | "SET_READY"
  | "SET_ACCESS_TOKEN"
  | "PUSH_ERROR"
  | "SET_PLAYER";

export interface StateAction {
  type: StateActionType;
  payload?: {
    [key: string]: any;
  };
}

export interface RootState {
  app: AppState;
  user: UserState;
  player: PlayerState;
}
