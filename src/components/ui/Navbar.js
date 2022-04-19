import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

export const Navbar = () => {
  // ?Extremos la informacion del context. De parametro tenemos que
  // ?agregar el context que tenga la informacion
  const { user, dispatch } = useContext(AuthContext);

  // ?Navigate nos permite navegar a otras pantallas
  const navigate = useNavigate();

  // ?Si el usuario le da a logout, el objeto del usuario le borramos
  // ?la info y el logged = false
  const handleLogout = () => {
    const action = {
      type: types.logout,
    };
    // ?enviamos la accion al reducer
    dispatch(action);

    // ?Como segundo argumento tenemos opciones, el replace nos permite
    // ?no 'guardar' la pagina en la que estamos en el historial, entonces
    // ?si el usuario retrocede en la pagina, no saldria esta
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Asociaciones
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink
            className={({ isActive }) =>
              "nav-item nav-link " + (isActive && "active")
            }
            to="/marvel"
          >
            Marvel
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              "nav-item nav-link " + (isActive && "active")
            }
            to="/dc"
          >
            DC
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "nav-item nav-link " + (isActive && "active")
            }
            to="/search"
          >
            Search
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-info">{user.name}</span>
          <button className="nav-item nav-link btn" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
