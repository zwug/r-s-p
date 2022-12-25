import { Typography } from 'antd';
import { Route, Routes } from 'react-router';
import './App.css';
import { CreateGame } from './containers/create-game';
import { Main } from './containers/main';
import { BrowserRouter } from 'react-router-dom';
import { Game } from './containers/game/game';
import { JoinGame } from './containers/join-game/join-game';
import { Layout } from './components/layout/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Typography.Title>Rock paper scissors</Typography.Title>
        <Routes>
          <Route path="" element={<Main />}></Route>
          <Route path="/create" element={<CreateGame />}></Route>
          <Route path="/join" element={<JoinGame />}></Route>
          <Route path="/game" element={<Game />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
