import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Isr from './ISR';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/isr/*/:siteuid/:rpauid"
          element={<Isr />}
        />
      </Routes>
    </Router>
  );
};

export default App;
