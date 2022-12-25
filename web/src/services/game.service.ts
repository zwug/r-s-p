import { TGame, TPlayer } from '@shared/types';

export class GameService {
  private _game: TGame | null = null;
  private _player: TPlayer | null = null;

  setGame(game: TGame): void {
    this._game = game;
  }

  getGame(): TGame | null {
    return this._game;
  }

  setPlayer(player: TPlayer) {
    this._player = player;
  }

  getPlayer(): TPlayer | null {
    return this._player;
  }
}

export const gameService = new GameService();