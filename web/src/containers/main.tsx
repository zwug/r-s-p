import { Button, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

type TMainProps = {};

export const Main = ({}: TMainProps): JSX.Element => {
  return (
    <Space wrap>
      <Link to="/create">
        <Button>Create a new game</Button>
      </Link>
      <Link to="/join">
        <Button>Join a game</Button>
      </Link>
    </Space>
  );
};
