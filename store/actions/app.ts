import { AppError, AppPushErrorAction, AppSetReadyAction } from "../../types";

export const setReady = (): AppSetReadyAction => ({
  type: "SET_READY",
});

export const pushError = (error: AppError): AppPushErrorAction => {
  return {
    type: "PUSH_ERROR",
    payload: error,
  };
};
