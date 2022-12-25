import { TCreateGameValues } from '../forms/create-game/types';
import { getBackendPath } from './utils';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { TJoinGameValues } from '../forms/join-game-form/types';
import { GameAction } from 'src/const';

export const createGame = (
  values: TCreateGameValues
): Socket<DefaultEventsMap, DefaultEventsMap> => {
  return io(getBackendPath(), {
    auth: { nickname: values.nickname },
    query: {
      rounds: values.rounds,
      action: GameAction.CREATE
    },
  });
};

export const joinGame = (
  values: TJoinGameValues
): Socket<DefaultEventsMap, DefaultEventsMap> => {
  return io(getBackendPath(), {
    auth: { nickname: values.nickname },
    query: {
      gameId: values.gameId,
      action: GameAction.JOIN
    },
  });
};
