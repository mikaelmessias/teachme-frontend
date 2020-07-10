import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import enviroment from '../utils/dotenv';
import { JWTRequest, JWTPayload } from '../utils/interfaces/jwt';

const authMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { cookies } = _request;
  const request = _request as JWTRequest;
  if (cookies && cookies.Authorization) {
    const secret = enviroment.JWT_SECRET;
    console.log('aqui');

    try {
      const { _id: id } = jwt.verify(cookies.Authorization, secret) as JWTPayload;
      const user = await UserModel.findById(id).select('-password');

      if (user) {
        request.user = user;
        next();
      } else {
        response.status(400).json({
          message: 'Invalid token',
        });
      }
    } catch (error) {
      const { name, message, ...err } = error;

      response.status(400).json({ name, message, ...err });
    }
  } else {
    response.status(403).json({
      name: 'Forbbiden',
      message: 'Only logged users can access this area',
    });
  }
};

export default authMiddleware;
