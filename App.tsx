import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Configuration from './pages/Configuration';
import Results from './pages/Results';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config" element={<Configuration />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;