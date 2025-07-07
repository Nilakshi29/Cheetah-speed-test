// src/components/SpeedHistory.js

import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const SpeedHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('speedResults')) || [];
    setHistory(stored.reverse());
  }, []);

  const handleClearHistory = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all speed test history?');
    if (confirmClear) {
      localStorage.removeItem('speedResults');
      setHistory([]);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 className="sectionTitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        📊 Speed Test Summary
      </h2>

      <div style={contentWrapper}>
        {/* 📝 Left Side: History Table */}
        <div className="tableBox" style={tableBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="sectionTitle">📋 Test History</h3>
            <button onClick={handleClearHistory} style={buttonStyle}>🗑️ Clear</button>
          </div>

          {history.length === 0 ? (
            <p>No test results yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: '180px' }}>Date</th>
                    <th style={{ ...thStyle, width: '100px' }}>Ping</th>
                    <th style={{ ...thStyle, width: '150px' }}>Download</th>
                    <th style={{ ...thStyle, width: '150px' }}>Upload</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((result, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{new Date(result.timestamp).toLocaleString()}</td>
                      <td style={tdStyle}>{result.latency} ms</td>
                      <td style={tdStyle}>{result.downloadSpeed} Mbps</td>
                      <td style={tdStyle}>{result.uploadSpeed} Mbps</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 📈 Right Side: Chart */}
        <div className="chartBox" style={chartBox}>
          <h3 className="sectionTitle" style={sectionTitle}>📈 Trends</h3>

          {history.length === 0 ? (
            <p>No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history}>
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(str) =>
                    new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                />
                <YAxis />
                <Tooltip labelFormatter={(str) => new Date(str).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="downloadSpeed" stroke="#8884d8" name="Download (Mbps)" />
                <Line type="monotone" dataKey="uploadSpeed" stroke="#82ca9d" name="Upload (Mbps)" />
                <Line type="monotone" dataKey="latency" stroke="#FF8042" name="Ping (ms)" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

// 💅 Inline Styles (You can migrate to CSS later if preferred)
const containerStyle = {
  padding: '2rem',
  maxWidth: '1300px',
  margin: '0 auto',
};

const contentWrapper = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  gap: '2rem',
  alignItems: 'flex-start',
};

const tableBox = {
  flex: '1 1 45%',
  backgroundColor: '#fff',
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
};

const chartBox = {
  flex: '1 1 55%',
  backgroundColor: '#fff',
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
};

const sectionTitle = {
  marginBottom: '1rem',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  borderBottom: '1px solid #ccc',
  textAlign: 'left',
  padding: '6px 10px',
  //backgroundColor: '#f8f8f8',
  fontSize: '0.85rem',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  borderBottom: '1px solid #eee',
  padding: '6px 10px',
  fontSize: '0.85rem',
  whiteSpace: 'nowrap',
};

const buttonStyle = {
  backgroundColor: '#ff4d4f',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default SpeedHistory;
