import { Reducer } from "redux";
import { PlayerAction, PlayerSetAction, PlayerState } from "../../types";

const initialState: PlayerState = {};

const handleSetPlayer = (
  state: PlayerState,
  actionPayload: PlayerSetAction["payload"]
): PlayerState => {
  return actionPayload;
};

const reducer: Reducer<PlayerState, PlayerAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_PLAYER":
      return handleSetPlayer(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
