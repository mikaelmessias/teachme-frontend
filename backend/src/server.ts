import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import environment from './config/environment';
import { pathResolve } from './config/utils';
import routes from './routes';

const app = express();

mongoose.connect(environment.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/files/avatar', pathResolve(__dirname, '..', 'uploads', 'avatar'));
app.use('/files/thumbnail', pathResolve(__dirname, '..', 'uploads', 'thumbnail'));

app.listen(environment.PORT, () => {
  console.clear();
  console.log(`Server is listening on port ${environment.PORT}`);
});
