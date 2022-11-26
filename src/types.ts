export type TServerToClientEvents = {
  game_info: (game: TGame) => void;
};

export type TClientToServerEvents = {};

export type TInterServerEvents = {};

export type TSocketData = {
  nickname: string;
};

enum Choice {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors',
}

enum RoundResult {
  UNKNOWN = 'unknown',
  TIE = 'tie',
  FIRST_PLAYER_WIN = 'first_player_win',
  SECOND_PLAYER_WIN = 'second_player_win',
}

type TPlayer = {
  // id: string;
  nickname: string;
};

type TPlayerMove = {
  playerId: string;
  choice: Choice;
};

type TRound = {
  firstPlayerMove?: TPlayerMove;
  secondPlayerMove?: TPlayerMove;
  result: RoundResult;
};
export interface TGame {
  id: string;
  maxRounds: number;
  firstPlayer: TPlayer;
  secondPlayer?: TPlayer;
  rounds: TRound[];
  winnerPlayerId?: string;
}
