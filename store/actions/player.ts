import { SpotifyWebPlayer } from "../../classes";
import { PlayerSetAction } from "../../types";

export const setPlayer = (player: SpotifyWebPlayer): PlayerSetAction => {
  return {
    type: "SET_PLAYER",
    payload: {
      instance: player,
    },
  };
};
