/* eslint-disable no-underscore-dangle */
import { Response, Request } from 'express';
import UserSchema, { User } from '../models/User';
import * as authHelpers from '../utils/authHelpers';
import { JWTRequest } from '../utils/interfaces/jwt';
import * as mail from '../utils/mail';

class UserController {
  async index(_request: Request, response: Response): Promise<Response<any>> {
    try {
      const users = await UserSchema.find().select('-password -__v');
      return response.json(users);
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
  }

  async show(request: Request, response: Response): Promise<Response<any>> {
    try {
      const { user } = request as JWTRequest;

      if (!user) {
        return response.status(404).json({
          error: 'Document not found for given ID.',
        });
      }

      return response.json(user);
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
  }

  async store(request: Request, response: Response): Promise<Response<any>> {
    const { email, ...userData } = request.body;
    const { filename } = request.file;

    try {
      const user = await UserSchema.create({
        ...userData,
        email,
        avatar: filename,
      });

      mail.send('welcome', user);

      return response.json(user);
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
  }

  async update(request: Request, response: Response): Promise<Response<any>> {
    try {
      const { user } = request as JWTRequest;
      const filename = request.file ? request.file.filename : undefined;
      const userData: User = request.body;

      const updatedUser = await UserSchema.findByIdAndUpdate(user._id, {
        ...userData,
        avatar: filename || user.avatar,
      }, { new: true }).select('-password');

      return response.json(updatedUser);
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
  }

  async authenticate(request: Request, response: Response): Promise<Response<any>> {
    try {
      const { email, password } = request.body;

      const user = await UserSchema.findOne({ email });

      if (!user) {
        return response.status(400).json({
          error: 'User not found',
        });
      }

      const isPasswordMatching = await user.compareHash(password);

      if (!isPasswordMatching) {
        return response.status(400).json({
          error: 'Invalid password',
        });
      }

      const tokenData = authHelpers.createToken(user);

      response.setHeader('Set-Cookie', [authHelpers.createCookie(tokenData)]);

      return response.json({ user });
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
  }
};

export default UserController;
