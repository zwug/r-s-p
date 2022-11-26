import { TCreateGameValues } from '../forms/crate-game/types';
import { getBackendPath } from './utils';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const createGame = (
  values: TCreateGameValues
): Socket<DefaultEventsMap, DefaultEventsMap> => {
  return io(getBackendPath(), {
    auth: { nickname: values.nickname },
    query: {
      rounds: values.rounds,
    },
  });
};
