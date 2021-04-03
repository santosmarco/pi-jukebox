export interface AppInternalError {
  id: string;
  message: string;
}

export interface AppExternalError extends AppInternalError {
  fromApi: true;
  code: number;
  endpoint: string;
}

export const isExternalError = (error: AppError): error is AppExternalError =>
  "fromApi" in error && "code" in error && "endpoint" in error;

export type AppError = AppInternalError | AppExternalError;

export interface ApiError {
  message: string;
  code: number;
  endpoint: string;
}
