import { TokenData } from "../api";
import { StateAction } from "./root";

export type EmptyUser = { accessToken: "" };

export type AuthenticatedUser = TokenData;

export interface UserState {
  accessToken: string;
  expiresAt?: Date;
}

export interface UserSetAccessTokenAction extends StateAction {
  type: "SET_ACCESS_TOKEN";
  payload: TokenData;
}

export type UserAction = UserSetAccessTokenAction;
