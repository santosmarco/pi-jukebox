import { AppError } from "../types";
import screenStyles from "./Screen.module.css";

type ErrorScreenProps = {
  errors: AppError[];
};

const ErrorScreen: React.FC<ErrorScreenProps> = ({ errors }) => {
  return (
    <div className={screenStyles.screen}>ERROR: {JSON.stringify(errors)}</div>
  );
};

export default ErrorScreen;
