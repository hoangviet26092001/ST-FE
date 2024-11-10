// import React from "react";
import "./App.css";
import Board from "./components/Board";
import { TaskProvider } from "./context/taskContext";

function App() {
  return (
    <div>
      <TaskProvider>
        <Board />
      </TaskProvider>
    </div>
  );
}

export default App;
