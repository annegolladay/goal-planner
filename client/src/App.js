import React, { Fragment } from "react";
import './App.css';

//components

import InputTodo from "./components/InputTodo"
import ListPredictions from "./components/ListPredictions"

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListPredictions />
      </div>
    </Fragment>
  )
}

export default App;
