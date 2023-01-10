import "./App.css";

import Header from "../Header/Header";
import Main from "../Main";
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Header />
      <a name="top"></a>
      <Main />
      <a className="footer" href="#top">
        Back to top
      </a>
    </div>
  );
}
export default App;
