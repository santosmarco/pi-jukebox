import { PauseSolid } from "@graywolfai/react-heroicons";
import { Typography } from "antd";
import { PlayerTrack } from "../../types";
import styles from "./TrackArea.module.css";

type TrackAreaProps = {
  track: PlayerTrack;
  isPlaying: boolean;
  className?: string;
};

const TrackArea: React.FC<TrackAreaProps> = (props) => {
  const { name, cover, artist } = props.track;

  return (
    <div className={props.className}>
      <img src={cover.url} className={styles.coverImg} />
      {!props.isPlaying && (
        <div className={styles.pausedOverlay}>
          <PauseSolid className={styles.pausedIcon} />
        </div>
      )}
      <div className={styles.trackInfoContainer}>
        <div>
          <Typography.Title style={{ color: "white", margin: 0 }}>
            {name}
          </Typography.Title>
          <Typography.Title
            level={3}
            className={styles.trackInfoArtist}
            style={{ color: "white", margin: 0 }}
          >
            {artist.name}
          </Typography.Title>
        </div>
      </div>
    </div>
  );
};

export default TrackArea;
