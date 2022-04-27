import React from "react";

export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex flex-wrap justify-content-between">
        <div className="d-flex flex-wrap text-light">
          <span className="nav-item nav-link text-secondary">
            CAMILO MORALES
          </span>
        </div>
        <div className="d-flex flex-wrap">
          <span className="nav-item nav-link text-success">Total Puntos: text-success</span>
          <button className="btn btn-outline-secondary">Salir</button>
        </div>
      </div>
    </nav>
  );
};
