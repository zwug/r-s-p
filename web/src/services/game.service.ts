import { TGame, TPlayer } from '@shared/types';
import { BehaviorSubject } from 'rxjs';
import { createGame, joinGame } from 'src/api/game';
import { TCreateGameValues } from 'src/forms/create-game/types';
import { TJoinGameValues } from 'src/forms/join-game-form/types';

export class GameService {
  connectionError$ = new BehaviorSubject<string | null>(null);
  game$ = new BehaviorSubject<TGame | null>(null);
  private _game: TGame | null = null;
  private _player: TPlayer | null = null;

  setGame (game: TGame): void {
    this._game = game;
  }

  getGame (): TGame | null {
    return this._game;
  }

  setPlayer (player: TPlayer) {
    this._player = player;
  }

  getPlayer (): TPlayer | null {
    return this._player;
  }

  joinGame (values: TJoinGameValues) {
    const socket = joinGame(values);
    socket.on('connect_error', (err) => {
      this.connectionError$.next(err.message);
      socket.off('connect_error');
    });
    socket.on('game_info', (game: TGame) => {
      if (!game.secondPlayer) {
        return;
      }

      console.log('game-Info, ', game);
      this.game$.next(game);
      this.setGame(game);
      this.setPlayer({
        nickname: values.nickname,
        id: game.secondPlayer.id
      });
    });
  }

  createGame (values: TCreateGameValues) {
    const socket = createGame(values);

    socket.on('connect_error', (err) => {
      this.connectionError$.next(err.message);
      socket.off('connect_error');
    });
    socket.on('game_info', (game: TGame) => {
      console.log('game-Info, ', game);
      this.game$.next(game);
      this.setGame(game);
      this.setPlayer({
        nickname: values.nickname,
        id: game.firstPlayer.id
      });
    });
  }
}

export const gameService = new GameService();
