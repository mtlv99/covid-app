import React from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const Navbar = () => (
  <div className="navbar navbar-dark bg-dark mb-4 px-4">
    <span className="navbar-brand">
      <LocalHospitalIcon />
    </span>
    <p>Covid App</p>
    <button type="button" className="btn btn-outline-danger" onClick={() => {}}>
      <i className="fas fa-sign-out-alt" />
        &nbsp;
      <span>Salir</span>
    </button>
  </div>
);
