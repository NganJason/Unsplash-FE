import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import LoginModal from './Components/LoginModal/LoginModal';
import Signup from './Components/Signup/Signup';

import Nav from './_shared/Components/Nav/Nav';

const withNav = (component: JSX.Element): JSX.Element => {
  return (
    <>
      <Nav/>
      {component}
    </>
  );
}
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={withNav(<Home />)} />
        <Route path="/login" element={withNav(<Home />)} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <LoginModal />
    </div>
  );
}

export default App;
