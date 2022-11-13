import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.get('/api/test', cors(corsOptions), (_, res) => {
  res.send(200);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})