import { Row, Col, Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/error-message/error-message';
import { TJoinGameValues } from './types';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { joinGame } from '../../api/game';
import { TGame } from '@shared/types';
import { gameService } from '../../services/game.service';
import { useNavigate } from 'react-router';

export const JoinGameForm = (): JSX.Element => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const sub = gameService.game$.subscribe((game) => {
      if (!game) {
        navigate('/game');
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const onFinish = (values: TJoinGameValues) => {
    gameService.joinGame(values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<TJoinGameValues>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Row justify="space-between">
        <Col xs={{ span: 22, offset: 1 }} lg={{ span: 10, offset: 7 }}>
          <Form<TJoinGameValues>
            name="joinGame"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row justify="space-between">
              <Col span={8}>
                <Row justify="start">
                  <Form.Item
                    label="Nickname"
                    name="nickname"
                    rules={[
                      { required: true, message: 'Please input your username' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="start">
                  <Form.Item
                    label="Game ID"
                    name="gameId"
                    rules={[
                      { required: true, message: 'Please input game ID' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Row>
              </Col>
            </Row>

            <ErrorMessage error={error} />

            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" htmlType="submit">
                Join game
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
