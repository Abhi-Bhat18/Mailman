import { Express } from 'express-serve-static-core';

global {
  declare namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        iat: string;
        exp: string;
      };
    }
  }
}
