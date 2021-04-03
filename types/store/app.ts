import { AppError } from "../errors";
import { StateAction } from "./root";

export interface AppState {
  loading: boolean;
  ready: boolean;
  errors: AppError[];
}

export interface AppSetReadyAction extends StateAction {
  type: "SET_READY";
}

export interface AppPushErrorAction extends StateAction {
  type: "PUSH_ERROR";
  payload: AppError;
}

export type AppAction = AppSetReadyAction | AppPushErrorAction;
