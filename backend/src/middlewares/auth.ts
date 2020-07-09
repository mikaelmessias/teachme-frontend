import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/ban-types
  decoded: object | undefined;
}

interface RequestHandler {
  request: AuthRequest;
  response: Response;
  next: NextFunction;
}

// eslint-disable-next-line consistent-return
const auth = async ({ request, response, next }: RequestHandler):Promise<any> => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).send({
      error: 'No token provided',
    });
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(authorization, 'secret', (error, decoded) => {
    if (!error) {
      request.decoded = decoded;
      next();
    } else {
      return response.status(401).send({
        error: 'Token invalid',
      });
    }
  });
};

export default auth;
