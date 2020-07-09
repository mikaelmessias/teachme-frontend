import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import environment from './utils/dotenv';
import { pathResolve } from './utils/functions';

const app = express();

mongoose.connect(environment.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/files/avatar', pathResolve(__dirname, '..', 'uploads', 'avatar'));
app.use('/files/techLogo', pathResolve(__dirname, '..', 'uploads', 'techLogo'));

app.listen(environment.PORT, () => {
  console.clear();
  console.log(`Server is listening on port ${environment.PORT}`);
});
