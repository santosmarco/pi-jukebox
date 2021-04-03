import { TokenResponse } from "../types";

export const getAccessToken = async (): Promise<TokenResponse> => {
  const tokenRes = await fetch("/api/token");
  const tokenData = await tokenRes.json();

  return tokenData;
};
