import { Avatar, Divider, List } from "antd";
import Search from "antd/lib/input/Search";
import { useSpotifyWebPlayer } from "../../hooks";
import styles from "./SidebarArea.module.css";

type SidebarAreaProps = {
  className?: string;
};

const SidebarArea: React.FC<SidebarAreaProps> = (props) => {
  const { state } = useSpotifyWebPlayer();

  return (
    <div className={props.className}>
      <Search
        placeholder="Search tracks..."
        className={styles.search}
        style={{ backgroundColor: "#666" }}
      />

      <Divider className={styles.divider} orientation="left">
        Queue
      </Divider>
      <List
        itemLayout="horizontal"
        dataSource={state?.trackWindow.nextTracks || []}
        renderItem={(track) => {
          return (
            <List.Item className={styles.listItem}>
              <List.Item.Meta
                title={track.name}
                description={<em>{track.artist.name}</em>}
                avatar={<Avatar src={track.cover.url} />}
              />
            </List.Item>
          );
        }}
      />

      <Divider className={styles.divider} orientation="left">
        Recommended
      </Divider>
      <List
        itemLayout="horizontal"
        dataSource={state?.trackWindow.nextTracks || []}
        renderItem={(track) => {
          return (
            <List.Item className={styles.listItem}>
              <List.Item.Meta
                title={track.name}
                description={<em>{track.artist.name}</em>}
                avatar={<Avatar src={track.cover.url} />}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default SidebarArea;
