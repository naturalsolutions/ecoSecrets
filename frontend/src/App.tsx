import React from 'react';
import logo from './logo.svg';
import './App.css';
import First from "./components/first"

function App() {
  return (
    <div className="App">
      <First></First>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload tutu.
        </p>
        <First></First>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
