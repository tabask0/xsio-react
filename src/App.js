import { useEffect } from "react";
import Game from "./components/Game";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "X si O";
  }, []);

  return <Game />;
}

export default App;
