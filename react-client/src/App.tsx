import React from 'react';
import MainRouter from './pages/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <MainRouter></MainRouter>
      </Router>
    </div>
  );
}

export default App;
