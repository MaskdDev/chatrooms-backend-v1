import type { AuthUser, Session } from "./auth.ts";

declare global {
  namespace Express {
    interface Request {
      authSession?: Session;
      authUser?: AuthUser;
    }
  }
}
