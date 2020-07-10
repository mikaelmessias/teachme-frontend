import { DocumentType } from '@typegoose/typegoose';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';

export interface JWTDecoded {
  id: string,
}

export interface JWTRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: DocumentType<User>;
}

export interface TokenData {
  token: string;
  expiresIn: string | number;
}

export interface JWTPayload {
  _id: string;
}
