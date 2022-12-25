import { Alert, Button, Col, Form, Input, Radio, Row, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { gameService } from '../../services/game.service';
import { Header } from './components/header/header';
import { error } from 'console';
import { ErrorMessage } from 'src/components/error-message/error-message';

interface TGameProps {}

interface TGameValues {
  choice: string
}

export const Game = ({}: TGameProps): JSX.Element => {
  const game = useMemo(() => gameService.getGame(), []);
  const player = useMemo(() => gameService.getPlayer(), []);

  const onFinish = useCallback((values: TGameValues) => {
    console.log(values);
  }, []);

  const onFinishFailed = useCallback(() => {
    console.log('failed');
  }, []);

  if ((game == null) || (player == null)) {
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
      <Form<TGameValues>
            name="game"
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
        <Form.Item>
          <Radio.Group>
            <Radio.Button value="rock">Rock</Radio.Button>
            <Radio.Button value="paper">Paper</Radio.Button>
            <Radio.Button value="scissors">Scissors</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* <ErrorMessage error={error} /> */}

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
