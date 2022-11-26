import React from 'react';
import { Link } from 'react-router-dom';

type TMainProps = {};

export const Main = ({}: TMainProps): JSX.Element => {
  return (
    <div>
      <Link to='/create'>Create</Link>
    </div>
  );
};
