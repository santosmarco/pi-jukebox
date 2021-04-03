import { useEffect, useState } from "react";
import { SpotifyPlayerState } from "../types";
import useStateSlice from "./useStateSlice";

const useSpotifyWebPlayer = () => {
  const { instance: player } = useStateSlice("player");
  const { accessToken } = useStateSlice("user");
  const { ready } = useStateSlice("app");

  const [playerState, setPlayerState] = useState<SpotifyPlayerState>();

  useEffect(() => {
    player.on("state_changed", (newState) => setPlayerState(newState));
  }, []);

  return {
    player,
    state: playerState,
    accessToken,
    ready,
  };
};

export default useSpotifyWebPlayer;
