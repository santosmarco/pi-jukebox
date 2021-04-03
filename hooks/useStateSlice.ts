import { useSelector } from "react-redux";
import { RootState } from "../types";

const useStateSlice = <T extends keyof RootState>(slice: T): RootState[T] => {
  return useSelector<RootState, RootState[T]>((state) => state[slice]);
};

export default useStateSlice;
