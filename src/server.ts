import {config as dotenv} from 'dotenv';
dotenv();

import express from 'express';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json()); //Plugin para entender o request em json
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(errors());

const herokuPort = process.env["PORT"]
const PORT = herokuPort || 3333;
app.listen(Number(PORT), '0.0.0.0', () =>{console.log("Proccess running on port", process.env.PORT)});
