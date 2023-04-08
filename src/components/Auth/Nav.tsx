import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
      </ul>
    </nav>
  );
}