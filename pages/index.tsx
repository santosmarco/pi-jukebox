import moment from "moment";
import { GetServerSideProps } from "next";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";
import { SpotifyWebPlayer } from "../classes";
import { useStateSlice } from "../hooks";
import { ErrorScreen, JukeboxScreen, LoadingScreen } from "../screens";
import {
  pushError,
  setAccessToken,
  setPlayer,
  setReady,
} from "../store/actions";
import { displayMessage, getAccessToken, getStoredAccessToken } from "../utils";

const App: React.FC = () => {
  const { loading, ready, errors } = useStateSlice("app");

  const dispatch = useDispatch();

  const getAndSetAccessToken = useCallback(async () => {
    const { data, error } = await getAccessToken();
    if (error) {
      dispatch(
        pushError({
          id: uniqid(),
          fromApi: true,
          ...error,
        })
      );
    } else {
      dispatch(setAccessToken(data));
    }

    return { data, error };
  }, [dispatch]);

  const initializeApp = async () => {
    const player = await SpotifyWebPlayer.initialize({
      name: "PiJukebox",
      getAccessTokenHandler: getStoredAccessToken,
    });

    dispatch(setPlayer(player));

    const { data: token } = await getAndSetAccessToken();

    const keepAliveInterval = setInterval(
      getAndSetAccessToken,
      moment(token.expiresAt).diff(moment(), "milliseconds") - 1000 * 60
    );

    await player.connect({ autoPlay: true });

    dispatch(setReady());

    displayMessage("success", "Ready!");

    return keepAliveInterval;
  };

  useEffect(() => {
    displayMessage("loading", "Booting up...");

    let keepAliveInterval: NodeJS.Timeout;

    initializeApp().then((interval) => {
      keepAliveInterval = interval;
    });

    return () => {
      clearInterval(keepAliveInterval);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else if (ready) {
    return <JukeboxScreen />;
  } else {
    return <ErrorScreen errors={errors} />;
  }
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var ip = ctx.req.headers["x-real-ip"] || ctx.req.connection.remoteAddress;
  console.log(ctx.req.headers, ip);

  return {
    props: {},
  };
};

export default App;
