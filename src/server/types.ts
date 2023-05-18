import type { Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export type UserCredentialRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
