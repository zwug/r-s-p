import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';
import {
  TClientToServerEvents,
  TInterServerEvents,
  TServerToClientEvents,
  TSocketData,
} from './src/types';
import { GameController } from './src/game';

dotenv.config();

let gameController: null | GameController = null;

const corsOptions = {
  origin: `${process.env.HOST}:3000`, // frontend dev server
  optionsSuccessStatus: 200,
};

const app = express();
const httpServer = createServer(app);

const io = new Server<
  TClientToServerEvents,
  TServerToClientEvents,
  TInterServerEvents,
  TSocketData
>(httpServer, {
  cors: {
    origin: `${process.env.HOST}:3000`,
    methods: ['GET', 'POST'],
  },
});

app.use(cors(corsOptions));

io.use(async (socket, next) => {
  // const sockets = await io.fetchSockets();
  // console.log(sockets.length);

  const nickname = socket.handshake.auth.nickname;
  if (!nickname) {
    return next(new Error('invalid nickname'));
  }
  socket.data.nickname = nickname;

  const { rounds, gameId } = socket.handshake.query;

  if (rounds) {
    if (gameController) {
      return next(new Error('unable to create a game'));
    }
    gameController = new GameController({
      maxRounds: Number(rounds),
      firstPlayerName: nickname,
    });
  }

  if (gameId && typeof gameId === 'string' && gameController) {
    const isJoinedSuccess = gameController.joinGame(gameId, nickname);
    if (!isJoinedSuccess) {
      return next(new Error('unable to join'));
    }
  }

  next();
});

app.get('/api/test', (_, res) => {
  res.send(200);
});

io.on('connection', (socket) => {
  // createGame(socket.data.nickname);
  console.log('a user connected ', socket.data.nickname);
  if (gameController) {
    socket.emit('game_info', gameController.getGame());
  }
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
