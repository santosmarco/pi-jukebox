import { TokenData, UserSetAccessTokenAction } from "../../types";

export const setAccessToken = (
  tokenData: TokenData
): UserSetAccessTokenAction => ({
  type: "SET_ACCESS_TOKEN",
  payload: tokenData,
});
