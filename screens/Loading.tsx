import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "./Loading.module.css";
import screenStyles from "./Screen.module.css";

const SpinIndicator = <LoadingOutlined className={styles.spinner} spin />;

const LoadingScreen: React.FC = () => {
  return (
    <div className={screenStyles.screen}>
      <Spin indicator={SpinIndicator} />
    </div>
  );
};

export default LoadingScreen;
