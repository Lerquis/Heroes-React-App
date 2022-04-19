import React, { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

export const LoginScrenn = () => {
  // ?Sacamos el user-dispatch para poder hacer la funcion del reducer con
  // ?el login
  const { user, dispatch } = useContext(AuthContext);

  // ?Navigate nos permite navegar a otras pantallas
  const navigate = useNavigate();

  const handleLogin = () => {
    // ?Creamos una accion, en este caso es fija, en otras instancias
    // ?se tiene que comprar la base de datos con los datos, pero eso
    // ?mas adelante
    const action = {
      type: types.login,
      payload: {
        name: "Esteban",
        // ?El logged: true ya lo pone el reducer, aqui solo agregamos
        // ?el usuario
      },
    };

    // ?Enviamos la accion al reducer y cargamos los datos a todas
    // ?las paginas
    dispatch(action);

    // ?Nos permite navegar a esa pagina
    // ?Como segundo argumento tenemos opciones, el replace nos permite
    // ?no 'guardar' la pagina en la que estamos en el historial, entonces
    // ?si el usuario retrocede en la pagina, no saldria esta
    // navigate("/", {
    //   replace: true,
    // });

    // ?Cuando el usuario entra, si existe una ultima direccion guardada
    // ?entrara directamente a esa direccion
    const lastPath = localStorage.getItem("lastPath") || "/";
    navigate(lastPath, { replace: true });
  };

  return (
    <div className="container mt-5">
      <h1>LoginScreen</h1>
      <hr></hr>

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
