import * as React from 'react';
import { Link } from 'react-router-dom';
import Theme from '../ThemeSwitch/ThemeSwitch';
import './headerStyles.scss';

function Header() {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          BlogsHolder
        </Link>
        <Theme />
      </div>
    </header>
  );
}

export default Header;
