import { Typography } from 'antd';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { CreateGame } from './containers/create-game';
import { Main } from './containers/main';
import { BrowserRouter } from "react-router-dom";

function App() {
  useEffect(() => {
    fetch('http://localhost:8000/api/test').then(res => console.log(res));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Typography.Title>Rock, paper, scissors</Typography.Title>
        <Routes>
          <Route path='' element={<Main />}>
          </Route>
          <Route path='/create' element={<CreateGame />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
