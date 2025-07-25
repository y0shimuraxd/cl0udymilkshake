import React from 'react';
import EventMap from './EventMap';
import Header from './Header';
import '../styles/liquidGlass.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <EventMap />
      </main>
    </div>
  );
};

export default App;
