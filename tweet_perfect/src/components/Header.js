// src/components/Header.js
import React from 'react';
import Link from 'next/link';
import LoginButton from './LoginButton.js'

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary align-items-center">
        <div className="container">
          <Link href="/" passHref className="navbar-brand">
            Tweet Perfect
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" passHref className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" passHref className="nav-link">
                   About
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" passHref className="nav-link">
                   Contact
                </Link>
              </li>
              <li className="nav-item" >
                <span >
                  <LoginButton/>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
