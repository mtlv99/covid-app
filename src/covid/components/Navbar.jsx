import React from 'react';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

export const Navbar = () => (
  <div className="navbar navbar-dark bg-dark mb-4 px-4">
    <span className="navbar-brand">
      <CoronavirusIcon />
    </span>
    <p>Covid App</p>
  </div>
);
