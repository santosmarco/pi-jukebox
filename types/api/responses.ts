import { ApiError } from "../errors";

export type ApiResponse<D extends { [key: string]: any }> = {
  data?: D;
  error?: ApiError;
};

export interface TokenData {
  accessToken: string;
  expiresAt: Date;
}

export type TokenResponse = ApiResponse<TokenData>;
