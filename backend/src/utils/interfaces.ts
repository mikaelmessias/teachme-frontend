import { Request, Response, NextFunction } from 'express';

export interface JWTDecoded {
  id: string,
}

interface JWTRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/ban-types
  decoded: JWTDecoded | undefined;
}

export interface JWTSignedRequest {
  request: JWTRequest;
  response: Response;
  next: NextFunction;
}
