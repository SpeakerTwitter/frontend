import React from "react";
import Header from './components/Header'
import routes from './config/routes'

function App() {
  return (
    <div className="App">
        <Header />
        {routes}
    </div>
  );
}

export default App;
