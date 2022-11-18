import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
  origin: `${process.env.HOST}:3000`, // frontend dev server
  optionsSuccessStatus: 200
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `${process.env.HOST}:3000`,
    methods: ["GET", "POST"]
  }
});

app.use(cors(corsOptions));

app.get('/api/test', (_, res) => {
  res.send(200);
})

httpServer.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

io.use((socket, next) => {
  const nickname = socket.handshake.auth.nickname;
  if (!nickname) {
    return next(new Error("invalid nickname"));
  }
  socket.nickname = nickname;
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');
});