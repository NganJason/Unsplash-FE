import React from 'react';
import './App.css';
import Home from './Components/Home/Home';

import Nav from './_shared/Components/Nav/Nav';

function App() {
  return (
    <div className="App">
        <Nav></Nav>
        <Home/>
    </div>
  );
}

export default App;
