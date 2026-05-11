import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shell from './src/components/Shell';
import HomeView from './src/pages/HomeView';
import WorkView from './src/pages/WorkView';
import StackView from './src/pages/StackView';
import ConnectView from './src/pages/ConnectView';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/work" element={<WorkView />} />
          <Route path="/stack" element={<StackView />} />
          <Route path="/connect" element={<ConnectView />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
};

export default App;
