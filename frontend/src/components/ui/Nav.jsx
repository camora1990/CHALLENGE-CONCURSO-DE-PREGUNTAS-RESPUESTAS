import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import PropTypes from "prop-types";
import { types } from "../../types/types";

export const Nav = React.memo(({ puntos = 0 }) => {
  const { player, dispatch } = useContext(AuthContext);
  const handleClick = () => {
    dispatch({
      type: types.logout,
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex flex-wrap justify-content-between">
        <div className="d-flex flex-wrap text-light">
          <span className="nav-item nav-link text-secondary">
            {player.name}
          </span>
        </div>
        <div className="d-flex flex-wrap">
          <span className="nav-item nav-link text-success">
            Total Puntos: {puntos}
          </span>
          <button className="btn btn-outline-secondary" onClick={handleClick}>
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
});

Nav.propTypes = { puntos: PropTypes.number.isRequired };
Nav.defaultProps = {
  puntos: 0,
};
