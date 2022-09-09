import React from 'react';
import './App.css';

const onClickCon = () => {
  console.log("connect")
}

const onClickOne = () => {
  console.log("one")
}

const onClickTwo = () => {
  console.log("two")
}


const App = () => {
  return (
    <div>
      <h1>Game</h1>
      <button onClick={onClickCon}>Connect</button>
      <button onClick={onClickOne}>Button 1</button>
      <button onClick={onClickTwo}>Button 2</button>
    </div>
  );
}

export default App;
