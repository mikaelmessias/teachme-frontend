/* eslint-disable no-underscore-dangle */
import { DocumentType } from '@typegoose/typegoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import enviroment from './dotenv';
import { TokenData, JWTPayload } from './interfaces/jwt';

export const createToken = (user: DocumentType<User>): TokenData => {
  const expiresIn = '1h';
  const secret = enviroment.JWT_SECRET;
  const payload: JWTPayload = {
    _id: user._id,
  };

  return ({
    expiresIn,
    token: jwt.sign(payload, secret, { expiresIn }),
  });
};

export const createCookie = (tokenData: TokenData): string => (
  `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
);
