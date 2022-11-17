import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: `${process.env.HOST}:3000`, // frontend dev server
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/api/test', (_, res) => {
  res.send(200);
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})