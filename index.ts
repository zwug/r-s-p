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
} from './shared/types';
import { GameController } from './src/game';
import { GameAction } from './src/const';

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

io.use((socket, next) => {
  const nickname = socket.handshake.auth.nickname;
  if (!nickname) {
    return next(new Error('invalid nickname'));
  }
  socket.data.nickname = nickname;
  const socketId = socket.id;

  const { rounds, gameId, action } = socket.handshake.query;

  if (action === GameAction.CREATE && rounds) {
    if (gameController) {
      console.log('Unable - gameController already exists');
      return next(new Error('Unable to create a game'));
    }
    gameController = new GameController({
      maxRounds: Number(rounds),
      firstPlayerName: nickname,
      firstPlayerId: socketId
    });
  }
  
  if (action === GameAction.JOIN) {    
    if (!gameId || typeof gameId !== 'string') {
      return next(new Error('Game Id is incorrect'));
    }

    if (!gameController) {
      return next(new Error('Game doesn\'t exist'));
    }

    const isJoinedSuccess = gameController.joinGame(gameId, nickname, socketId);
    console.log('isJoinedSuccess', isJoinedSuccess);
    

    if (!isJoinedSuccess) {
      return next(new Error('Failed to join'));
    }

    const game = gameController.getGame();
    console.log(game);
    
    const opponentId = game.firstPlayer.id;

    socket.to(opponentId).emit("game_info", game);
  }

  next();
});

app.get('/api/test', (_, res) => {
  res.send(200);
});

io.on('connection', (socket) => {
  console.log('a user connected ', socket.data.nickname);
  if (gameController) {
    socket.emit('game_info', gameController.getGame());
  }
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
