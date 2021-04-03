import { useEffect, useState } from "react";
import styles from "./KeyboardKeyBtn.module.css";

type KeyboardKeyBtnProps = {
  icon: React.ReactNode;
  keyCode: string | string[];
  onKeyPress: () => void;
  label?: string;
  size?: number;
  className?: string;
  labelLeft?: boolean;
};

export const KeyboardKeyBtn: React.FC<KeyboardKeyBtnProps> = (props) => {
  const [pressed, setPressed] = useState(false);

  const label = props.label && (
    <div className={props.labelLeft ? styles.labelLeft : styles.labelRight}>
      {props.label}
    </div>
  );

  useEffect(() => {
    const keyCodes =
      typeof props.keyCode === "string" ? [props.keyCode] : props.keyCode;

    const onKeyDown = (e: KeyboardEvent) => {
      if (keyCodes.includes(e.code)) {
        setPressed(true);
        props.onKeyPress();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (keyCodes.includes(e.code)) {
        setPressed(false);
      }
    };

    document.body.addEventListener("keydown", onKeyDown);
    document.body.addEventListener("keyup", onKeyUp);

    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
      document.body.removeEventListener("keyup", onKeyUp);
    };
  }, [props.keyCode]);

  return (
    <div
      className={
        props.className
          ? styles.container + " " + props.className
          : styles.container
      }
    >
      {props.labelLeft && label}
      <div
        style={{
          width: props.size || 30,
          height: props.size || 30,
          borderRadius: props.size / 2 || 15,
          color: pressed ? "#999" : "black",
        }}
      >
        {props.icon}
      </div>
      {!props.labelLeft && label}
    </div>
  );
};
