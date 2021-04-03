import { Col, Row } from "antd";
import { ControlsArea, SidebarArea, TrackArea } from "../components";
import { useSpotifyWebPlayer } from "../hooks";
import styles from "./Jukebox.module.css";
import LoadingScreen from "./Loading";

const JukeboxScreen: React.FC = () => {
  const { player, state } = useSpotifyWebPlayer();

  if (!state) {
    return <LoadingScreen />;
  }
  return (
    <div className={styles.screen}>
      <Row>
        <Col xs={18}>
          <TrackArea
            track={state.trackWindow.currentTrack}
            isPlaying={state.isPlaying}
            className={styles.trackArea}
          />
          <ControlsArea
            player={player}
            state={state}
            className={styles.controlsArea}
          />
        </Col>
        <Col xs={6}>
          <SidebarArea className={styles.sidebarArea} />
        </Col>
      </Row>
    </div>
  );
};

export default JukeboxScreen;
