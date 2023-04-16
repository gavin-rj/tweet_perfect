// src/components/Header.js
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/" passHref>
            <p className="navbar-brand">Tweet Perfect</p>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" passHref>
                  <p className="nav-link">Home</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" passHref>
                  <p className="nav-link">About</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" passHref>
                  <p className="nav-link">Contact</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
