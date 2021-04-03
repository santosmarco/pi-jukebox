import { message } from "antd";

export const displayMessage = (
  type: Parameters<typeof message["open"]>[0]["type"],
  text: string
) => {
  return message[type]({
    content: text,
  });
};
