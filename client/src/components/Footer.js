import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        Made with <span className="heart">❤️</span> by <strong>Nilakshi Shree</strong>
      </p>
      <div className="social-icons">
        <a  className="github-icon" href="https://github.com/Nilakshi29" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a className="linkedin-icon" href="https://linkedin.com/in/nilakshi-shree" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
