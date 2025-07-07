// src/App.js
import React from 'react';
import SpeedTest from './components/SpeedTest';
import SpeedHistory from './components/SpeedHistory';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <ThemeToggle />
      </div>
      <SpeedTest />
      <SpeedHistory />
      <Footer/>
    </div>
  );
}

export default App;
