import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import LoginModal from './Components/LoginModal/LoginModal';

import Nav from './_shared/Components/Nav/Nav';

function App() {
  return (
    <div className="App">
        <Nav></Nav>
        <Home/>
        <LoginModal/>
    </div>
  );
}

export default App;
