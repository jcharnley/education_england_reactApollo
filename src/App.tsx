import React from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './components/welcome'
import Navbar from './components/navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar name={'jason'}></Navbar>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Welcome name={'jason'}></Welcome>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
