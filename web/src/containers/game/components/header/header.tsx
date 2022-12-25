import { Row, Col, Typography } from 'antd';
import { TGame, TPlayer } from '@shared/types';
import styles from './header.module.css';

type THeaderProps = {
  game: TGame;
  player: TPlayer;
};

export const Header = ({ game, player }: THeaderProps): JSX.Element => {
  return (
    <>
      <Row>
        <Typography.Title level={3}>{player.nickname}</Typography.Title>
      </Row>
      <Row justify="space-between">
        <Col>
          <Typography className={styles.gameId}>game ID</Typography>
          <Typography.Text copyable strong>
            {game.id}
          </Typography.Text>
        </Col>
        <Col>
          <Typography>Round</Typography>
          <Typography.Text strong>{game.rounds.length}</Typography.Text>
        </Col>
      </Row>
    </>
  );
};
