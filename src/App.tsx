import React from 'react';
import Layout from './components/Layout';
import Content from './components/Content';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router basename={process.env.PUBLIC_URL}>
        <Layout />
      </Router>
    </div>
  );
};

export default App;
