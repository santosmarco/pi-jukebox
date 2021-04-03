import { Reducer } from "redux";
import {
  AuthenticatedUser,
  UserAction,
  UserSetAccessTokenAction,
  UserState,
} from "../../types";

const initialState: UserState = {
  accessToken: null,
};

const handleSetAccessToken = (
  state: UserState,
  actionPayload: UserSetAccessTokenAction["payload"]
): AuthenticatedUser => {
  return {
    ...state,
    ...actionPayload,
  };
};

const reducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return handleSetAccessToken(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
