import {
  ArrowCircleDownOutline,
  ArrowCircleUpOutline,
  FastForwardOutline,
  PauseOutline,
  PlayOutline,
  RewindOutline,
  SearchCircleOutline,
} from "@graywolfai/react-heroicons";
import { Player, SpotifyPlayerState } from "../../types";
import { KeyboardKeyBtn } from "../KeyboardKeyBtn";
import styles from "./ControlsArea.module.css";

type ControlsAreaProps = {
  player: Player;
  state: SpotifyPlayerState;
  className?: string;
};

const ControlsArea: React.FC<ControlsAreaProps> = (props) => {
  const {
    increaseVolume,
    decreaseVolume,
    togglePlay,
    previousTrack,
    nextTrack,
  } = props.player;

  return (
    <div className={props.className}>
      <div className={styles.container}>
        <div className={styles.section}>
          <KeyboardKeyBtn
            keyCode="ArrowUp"
            label="Vol up"
            onKeyPress={increaseVolume}
            icon={<ArrowCircleUpOutline />}
            className={styles.bottomMargined}
          />
          <KeyboardKeyBtn
            keyCode="ArrowDown"
            label="Vol down"
            onKeyPress={decreaseVolume}
            icon={<ArrowCircleDownOutline />}
          />
        </div>
        <div className={`${styles.section} ${styles.middleSection}`}>
          <KeyboardKeyBtn
            keyCode="ArrowLeft"
            onKeyPress={previousTrack}
            icon={<RewindOutline />}
          />
          <KeyboardKeyBtn
            keyCode="Space"
            onKeyPress={togglePlay}
            icon={props.state.isPlaying ? <PauseOutline /> : <PlayOutline />}
            size={45}
            className={styles.xMargined}
          />
          <KeyboardKeyBtn
            keyCode="ArrowRight"
            onKeyPress={nextTrack}
            icon={<FastForwardOutline />}
          />
        </div>
        <div className={styles.section}>
          <KeyboardKeyBtn
            keyCode="ArrowUp"
            label="Search"
            onKeyPress={() => {}}
            icon={<SearchCircleOutline />}
            labelLeft
          />
        </div>
      </div>
    </div>
  );
};

export default ControlsArea;
