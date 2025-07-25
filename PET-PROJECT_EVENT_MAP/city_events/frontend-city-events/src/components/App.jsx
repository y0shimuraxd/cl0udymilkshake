import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';  // без Router

import Header from './Header';
import EventMap from './EventMap';
import Register from './Register';
import Profile from './Profile';
import EventPage from './EventPage';
import Login from './Login';
import AddEvent from './AddEvent';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <>
      <Header token={token} setToken={setToken} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<EventMap />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/add" element={token ? <AddEvent /> : <Login setToken={setToken} />} />
          <Route path="/eventpage" element={<EventPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
