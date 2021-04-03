import { Reducer } from "redux";
import { AppAction, AppPushErrorAction, AppState } from "../../types";

const initialState: AppState = {
  loading: true,
  ready: false,
  errors: [],
};

const handleSetReady = (state: AppState): AppState => ({
  ...state,
  loading: false,
  ready: true,
});

const handlePushError = (
  state: AppState,
  actionPayload: AppPushErrorAction["payload"]
): AppState => {
  return {
    ...state,
    errors: [...state.errors, actionPayload],
  };
};

const reducer: Reducer<AppState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_READY":
      return handleSetReady(state);
    case "PUSH_ERROR":
      return handlePushError(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
