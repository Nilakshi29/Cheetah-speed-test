// src/components/SpeedTest.js
import React, { useState } from 'react';

// replacing const API_URL = 'http://localhost:5000/api'; with below link to link the frontend to backend
const API_URL = "https://cheetah-server-zr6x.onrender.com";
//now the frontend sends the call to backend and backend stores it in the mongodb

const SpeedTest = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [ping, setPing] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  //functions for calculating download and uplaod speed
  const testDownload = async () => {
    const fileSizeInBytes = 5 * 1024 * 1024;
    const startTime = performance.now();
    await fetch(`${API_URL}/download`);
    const endTime = performance.now();

    const duration = (endTime - startTime) / 1000;
    const speed = (((fileSizeInBytes * 8) / duration / 1024 / 1024)*0.125).toFixed(2);
    setDownloadSpeed(speed);
    return speed;
  };

  const testUpload = async () => {
    const dummyData = new Uint8Array(5 * 1024 * 1024);
    const startTime = performance.now();
    await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: dummyData,
    });
    const endTime = performance.now();

    const duration = (endTime - startTime) / 1000;
    const speed = (((dummyData.length * 8) / duration / 1024 / 1024)*0.125).toFixed(2);
    setUploadSpeed(speed);
    return speed;
  };

  //function for calculating the ping means the latency
  const testPing = async () => {
    const start = performance.now();
    await fetch(`${API_URL}/ping`);
    const end = performance.now();
    const latency = (end - start).toFixed(2);
    setPing(latency);
    return latency;
  };

  //function of running all the tests one by one
  const runAllTests = async () => {
    setIsTesting(true);
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);

    const latency = await testPing();
    const download = await testDownload();
    const upload = await testUpload();

    //displaying the result
    const result = {
      latency,
      downloadSpeed: download,
      uploadSpeed: upload,
      timestamp: new Date().toISOString(),
    };

    // ✅ 1. Save to localStorage
    const previous = JSON.parse(localStorage.getItem('speedResults')) || [];
    previous.unshift(result);
    localStorage.setItem('speedResults', JSON.stringify(previous.slice(0, 10)));

    // ✅ 2. Send to backend
    try {
      const response = await fetch(`${API_URL}/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });
      const data = await response.json();
      console.log('✅ Result saved to MongoDB:', data);
    } catch (err) {
      console.error('❌ Error saving to MongoDB:', err);
    }

    setIsTesting(false);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🌐 Internet Speed Test</h1>
      <button onClick={runAllTests} disabled={isTesting} className="start-test-button">
        {isTesting ? 'Testing...' : 'Start Test'}
      </button>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{
          backgroundColor: '#181818',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>📥 Download Speed:</span>
          <span>{downloadSpeed ? `${downloadSpeed} Mbps` : '---'}</span>
        </p>

        <p style={{
          backgroundColor: '#181818',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>📤 Upload Speed:</span>
          <span>{uploadSpeed ? `${uploadSpeed} Mbps` : '---'}</span>
        </p>

        <p style={{
          backgroundColor: '#181818',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>📶 Ping: </span>
          <span>{ping ? `${ping} ms` : '---'}</span>
        </p>
      </div>


    </div>
  );
};

export default SpeedTest;
