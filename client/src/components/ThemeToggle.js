// client/src/components/ThemeToggle.js
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={toggleStyle}>
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

const toggleStyle = {
  padding: '6px 14px',
  margin: '1rem',
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px'
};

export default ThemeToggle;


//⚠️ Future mein agar tum:
// Toggle ka design change karna chahte ho
// Toggle ko kisi aur component (e.g., footer) mein bhi dikhana chahte ho
// Theme toggle ko icon ya animation dena chahte ho
// …toh tum sirf ThemeToggle.js file edit karoge, baaki saari functionality already connected rahegi.
