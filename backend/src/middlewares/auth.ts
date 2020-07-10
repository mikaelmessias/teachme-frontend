import jwt from 'jsonwebtoken';
import { JWTSignedRequest, JWTDecoded } from '../utils/interfaces';

// eslint-disable-next-line consistent-return
const auth = async ({ request, response, next }: JWTSignedRequest): Promise<any> => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).send({
      error: 'No token provided',
    });
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(authorization, 'secret', (error, decoded) => {
    if (!error) {
      request.decoded = decoded as JWTDecoded;
      next();
    } else {
      return response.status(401).send({
        error: 'Token invalid',
      });
    }
  });
};

export default auth;
