import React, { useReducer, useEffect } from "react";
import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";
import { AppRouter } from "./components/routers/AppRouter";

const init = () => {
  // ?Como funcion inicial vamos a ver si se encuentra en el navegador
  // ?un objeto que se llame user, y si no existe, vamos a crear el
  // ?objeto de usuario sin informacion y con logged false
  // ?Debemos de convertir el string en un JSON(o sea objeto)
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

export const HeroesApp = () => {
  // ?De aqui vamos a sacar la informacion del usuario ya que el use
  // ?reducer es el que tiene el manejo del login-logout y nos devuelve
  // ?el user
  // ?En los parametros del useReducer enviamos las funciones que
  // ?que se pueden realizar, el estado inicial, y una funcion que
  // ?inicial tambien
  const [user, dispatch] = useReducer(authReducer, {}, init);

  // ?Cuando se realiza un cambio en el user, debemos de guardarlo
  // ?en el localStorage, para que se almaneza incluso si el usuario
  // ?recarga pagina
  useEffect(() => {
    if (!user) return;
    // ?Guardamos el usuario en el localStorage
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // ?Aqui el Context va a tener el usuario registrado en todas las
  // ?paginas que encierre el context
  return (
    // ?Enviamos de provder el usuario, y el dispatch para que se puedan
    // ?realizar las funciones de manera global
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};
