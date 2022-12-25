import { Row, Col, Form, Input, InputNumber, Button } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { createGame } from '../../api/game';
import { TCreateGameValues } from './types';
import { useEffect, useState } from 'react';
import { TGame } from '@shared/types';
import { gameService } from '../../services/game.service';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../components/error-message/error-message';

interface TCreateGameProps {}

export const CreateGameForm = ({}: TCreateGameProps): JSX.Element => {
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

  const onFinish = (values: TCreateGameValues) => {
    gameService.createGame(values);
  };

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<TCreateGameValues>
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify="space-between">
      <Col xs={{ span: 22, offset: 1 }} lg={{ span: 10, offset: 7 }}>
        <Form<TCreateGameValues>
          name="createGame"
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
                  label="Rounds"
                  labelAlign="right"
                  name="rounds"
                  rules={[{ required: true, message: 'Please input rounds' }]}
                >
                  <Row justify="start">
                    <InputNumber min={1} />
                  </Row>
                </Form.Item>
              </Row>
            </Col>
          </Row>

          <ErrorMessage error={error} />

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Create game
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
