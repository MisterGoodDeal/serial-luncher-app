import { hasOwnProperty } from "../utils/assert";

export type Fetch = (url: string, init?: RequestInit) => Promise<Response>;

export const isErrorStatus = (status: number) => {
  return status < 200 || status >= 300;
};

export interface ResponseError {
  statusCode: number;
  error: string;
  message: string;
}

export type ServiceResponse<T> = T | ResponseError;

export const isErrorResponse = <T extends object | undefined>(
  res: ServiceResponse<T>
): res is ResponseError => {
  return (
    hasOwnProperty(res, "statusCode") &&
    hasOwnProperty(res, "error") &&
    hasOwnProperty(res, "message")
  );
};
