import { TGame } from '../shared/types';
import { generateId } from './utils';

export type TGameProps = {
  maxRounds: number;
  firstPlayerName: string;
  firstPlayerId: string;
};

export class GameController {
  private readonly _game: TGame;

  constructor({ maxRounds, firstPlayerName, firstPlayerId }: TGameProps) {
    this._game = {
      id: generateId(),
      maxRounds,
      firstPlayer: {
        nickname: firstPlayerName,
        id: firstPlayerId,
      },
      rounds: [],
    };
  }

  getGame() {
    return this._game;
  }

  joinGame(gameId: string, playerName: string, playerId: string) {    
    if (this._game.id !== gameId || this._game.secondPlayer) {
      return false;
    }

    this._game.secondPlayer = {
      nickname: playerName,
      id: playerId,
    };

    return true;
  }
}
