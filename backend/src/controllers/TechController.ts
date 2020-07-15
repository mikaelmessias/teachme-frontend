/* eslint-disable camelcase */
import { Response, Request } from 'express';
import fs from 'fs';
import TechModel from '../models/Tech';

class TechController {
  async index(request: Request, response: Response): Promise<Response<any>> {
    try {
      const names = request.query.names as string;

      if (Array.isArray(names)) {
        return response.status(400).json({
          name: 'Bad request',
          message: 'Query param `names` should be a single string with its args separated by comma',
        });
      }

      const serializedNames = names
        ?.split(',')
        .map((name) => (name.trim()));

      const selectFields = 'id name logo logo_url';

      const techs = names
        ? await TechModel
          .find({ name: { $in: serializedNames } })
          .select(selectFields)
        : await TechModel
          .find()
          .select(selectFields);

      if (!techs.length) {
        return response.status(404).json({
          error: 'Found 0 documents.',
        });
      }

      const serializedTechs = techs.map(({ _id, name, logo_url }) => ({
        _id,
        name,
        logo_url,
      }));

      return response.json(serializedTechs);
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
  };

  async seed(_: Request, response: Response): Promise<Response<any>> {
    try {
      const jsonPath = `${__dirname}/../assets/techs.json`;

      const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

      const techs = await TechModel.create(jsonData);

      return response.json(techs);
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
  };

  async destroy(_: Request, response: Response): Promise<Response<any>> {
    try {
      const data = await TechModel.deleteMany({}).exec();
      return response.json(data);
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
  }
};

export default TechController;
