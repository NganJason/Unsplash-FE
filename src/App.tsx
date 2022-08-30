import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import './App.css';
import Home from './Components/Home/Home';

import Nav from './_shared/Components/Nav/Nav';

function App() {
  return (
    <div className="App">
        <Nav></Nav>
        <Home/>
        <Modal/>
    </div>
  );
}

export default App;
