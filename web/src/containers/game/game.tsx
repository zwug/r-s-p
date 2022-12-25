import { Alert, Col, Form, Input, Row, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { gameService } from '../../services/game.service';
import { Header } from './components/header/header';

type TGameProps = {};

export const Game = ({}: TGameProps): JSX.Element => {
  const game = useMemo(() => gameService.getGame(), []);
  const player = useMemo(() => gameService.getPlayer(), []);

  if (!game || !player) {
    return (
      <Alert
        message={'Seems like this game doesn\'t exist anymore'}
        type="error"
      />
    );
  }

  return (
    <div>
      <Header game={game} player={player} />
    </div>
  );
};
